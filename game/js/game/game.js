$(document).ready(function () {
    //ELIMINATE ARROW IN PUT ON WINDOW
    window.onkeydown = function (e) {
        if ((e.keyCode == 32) || (e.keyCode == 37) || (e.keyCode == 38) || (e.keyCode == 39) || (e.keyCode == 40) && e.target == document.body) {
            e.preventDefault();
        }
    };

    var game_div = document.getElementById('astronautica');
    var isMobile = false;
    var isMobileStart = false;
    var isFullscreen = false;

    $game_canvas = $('#astronautica');

    var left_button;
    var right_button;
    var up_button;

    var initMobileControls = function () {
        $game_canvas.append("<div id='mobile-controls'></div>");

        $mobile_controls = $('#mobile-controls');

        $mobile_controls.append(createControlButton('go-left', astronaut.body.moveLeft(400)));
        $mobile_controls.append(createControlButton('go-right', astronaut.body.moveRight(400)));
        $mobile_controls.append(createControlButton('go-up'));
    };

    var createControlButton = function(btnID, movement) {
        var button = document.createElement('button');
        button.id = btnID;

        button.addEventListener('touchstart', function () {
            GameState.boost();
            movement;
        });
    };

    var goFullScreen = function () {

        $game_canvas_real = $('#astronautica > canvas');
        $game_canvas_real.css('display', 'inline-block');

        if (isMobile && ($(document).width() < 600)) {
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT; //Stretched to full size
        }
        else {
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        }

        if (game_div.webkitRequestFullscreen) {
            game_div.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }

        else if (game_div.mozRequestFullScreen) {
            game_div.mozRequestFullScreen();
        }

        else if (game_div.msRequestFullscreen) {
            game_div.msRequestFullscreen();
        }

        else if (game_div.requestFullscreen) {
            game_div.requestFullscreen();
        }
    };

    // 13 = enter
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 13) {
            goFullScreen();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 27) {
            isFullscreen = false;
        }
    });

    document.addEventListener("touchstart", function () {
        goFullScreen();

        if (!isMobile) {
            isMobile = true;
        }

        if (!isMobileStart) {
            game.paused = false;
        }
    });

    //GAME STUFF
    var astronaut;
    var fuel;

    var current_score;
    var fuel_max;
    var current_fuel;
    var start_text;
    var start_text_content;

    var asteroidCollisionGroup;
    var playerCollisionGroup;
    var fuelCollisionGroup;

    var pickUpFuel;
    var bumpSound;
    var gameTrack;

    var activeGame;
    var startPhase = true;

    var open;
    var assetsLoaded = false;
    var purpleAsteroidPosition;

    //GRAPHIC ASSETS
    var graphicAssets = {
        astronautURL: 'assets/characters/pinkship.png',
        astronautName: 'astronaut',

        astronautYellowURL: 'assets/characters/yellowship.png',
        astronautYellowName: 'astronaut-yellow',

        astronautGreenURL: 'assets/characters/greenship.png',
        astronautGreenName: 'astronaut-green',

        astronautBlueURL: 'assets/characters/blueship.png',
        astronautBlueName: 'astronaut-blue',

        asteroidPurpleURL: 'assets/asteroids/asteroid_purple_64.png',
        asteroidPurpleName: 'asteroidPurple',

        asteroidOrangeURL: 'assets/asteroids/asteroid_orange_64.png',
        asteroidOrangeName: 'asteroidOrange',

        asteroidGreenURL: 'assets/asteroids/asteroid_green_64.png',
        asteroidGreenName: 'asteroidGreen',

        asteroidRedURL: 'assets/asteroids/asteroid_red_64.png',
        asteroidRedName: 'asteroidRed',

        backgroundURL: 'assets/environment/game_bg.jpg',
        backgroundName: 'background',

        fuelURL: 'assets/environment/fuel.png',
        fuelName: 'fuel'
    };

    //SOUND ASSETS
    var soundAssets = {
        gameTrackURL: 'assets/audio/pirate_loot.mp3',
        gameTrackName: 'gametrack',

        bumpSoundURL: 'assets/audio/bump.wav',
        bumpSoundName: 'bumpsound',

        refillURL: 'assets/audio/refill.wav',
        refillName: 'refillsound'
    };

    //SETTINGS
    var gameProperties = {
        screenWidth: 400,
        screenHeight: 650,

        screenPadding: 25,
        astronautSpeed: 5,

        asteroidMargin: 33
    };

    var fontStyle = {
        font: '22px Arial',
        fill: '#0095DD'
    };

    var fontStart = {
        font: '16px Arial',
        fill: '#FFFFFF'
    };

    var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'astronautica');

    //CHARACTER MENU STATE
    var ChooseCharacterState = {
        create: function (game) {
            $('#end-state-holder').remove();
            $('#play-astronautica-menu').remove();
            $('#hud-holder').remove();
            $('#mobile-controls').remove();

            chooseCharacter(function () {
                game.state.start('Game');
            }, graphicAssets, function () {
                game.state.start('Menu');
            });
        }
    };

    //"DEATH" STATE
    var EndOfGameState = {
        create: function (game) {

            //SEND_SCORE
            var played_by_id = document.getElementById('this-id');
            var my_real_id = played_by_id.getAttribute('value');

            $('#character-holder').remove();
            $('#play-astronautica-menu').remove();
            $('#hud-holder').remove();
            $('#mobile-controls').remove();

            game.add.tileSprite(0, 0, gameProperties.screenWidth, gameProperties.screenHeight, 'background');

            enterEnd(function () {
                game.state.start('Game');
            }, function () {
                game.state.start('Characters');
            }, function () {
                game.state.start('Menu');
            }, current_score, my_real_id);
        }
    };

    //GAME START STATE
    var MenuState = {
        preload: function () {
            //CHARACTER
            $game_canvas.append("<i id=\"load-spin\" class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i><span class=\"sr-only\">Loading...</span>");

            if (!assetsLoaded) {
                game.load.image(graphicAssets.astronautName, graphicAssets.astronautURL);
                game.load.image(graphicAssets.astronautYellowName, graphicAssets.astronautYellowURL);
                game.load.image(graphicAssets.astronautGreenName, graphicAssets.astronautGreenURL);
                game.load.image(graphicAssets.astronautBlueName, graphicAssets.astronautBlueURL);

                //ASTEROIDS
                game.load.image(graphicAssets.asteroidPurpleName, graphicAssets.asteroidPurpleURL);
                game.load.image(graphicAssets.asteroidOrangeName, graphicAssets.asteroidOrangeURL);
                game.load.image(graphicAssets.asteroidGreenName, graphicAssets.asteroidGreenURL);
                game.load.image(graphicAssets.asteroidRedName, graphicAssets.asteroidRedURL);

                //OTHER
                game.load.image(graphicAssets.backgroundName, graphicAssets.backgroundURL);
                game.load.image(graphicAssets.fuelName, graphicAssets.fuelURL);

                noSound = false; // flag
                
                if(!noSound) {
                    game.load.audio(soundAssets.refillName, soundAssets.refillURL);
                    game.load.audio(soundAssets.bumpSoundName, soundAssets.bumpSoundURL);
                    game.load.audio(soundAssets.gameTrackName, soundAssets.gameTrackURL);
                }

                assetsLoaded = true;
            }
        },

        create: function (game) {
            $('#load-spin').remove();

            $('#character-holder').remove();
            $('#end-state-holder').remove();
            $('#hud-holder').remove();
            $('#mobile-controls').remove();

            game.add.tileSprite(0, 0, gameProperties.screenWidth, gameProperties.screenHeight, 'background');
            enterMenu(function () {
                game.state.start('Game');
            }, function () {
                game.state.start('Characters');
            }, function () {
                goFullScreen();
            });
        }
    };

    var GameState = {
        create: function () {
            //CLEAR OVERLAY
            $('#character-holder').remove();
            $('#end-state-holder').remove();
            $('#play-astronautica-menu').remove();

            this.initNewGame();
            this.initAudio();
            this.initInputKeys();
            this.initTextContent();

            //SETBACKGROUND
            game.add.tileSprite(0, 0, gameProperties.screenWidth, gameProperties.screenHeight, 'background');
            game.stage.backgroundColor = '#000000';

            this.initGamePhysics();

            //ASTEROID SETTINGS
            asteroidCollisionGroup = game.physics.p2.createCollisionGroup();
            asteroids = game.add.group();
            asteroids.enableBody = true;
            asteroids.physicsBodyType = Phaser.Physics.P2JS;

            //FUEL SETTINGS
            fuelCollisionGroup = game.physics.p2.createCollisionGroup();
            fuels = game.add.group();
            fuels.enableBody = true;
            fuels.physicsBodyType = Phaser.Physics.P2JS;

            this.initCharacter();

            //SPAWN ASTEROIDS
            game.time.events.add(Phaser.Timer.SECOND * 0.2, this.generateAsteroidRow, this);
            game.time.events.add(Phaser.Timer.SECOND * 8, this.generateFuelItem, this);
            game.time.events.add(Phaser.Timer.SECOND * 16, this.generateRedAsteroid, this);
            game.time.events.add(Phaser.Timer.SECOND * 25, this.generateGreenAsteroid, this);
            game.time.events.add(Phaser.Timer.SECOND * 50, this.generatePurpleAsteroid, this);

            //DEAL WITH COLLISION
            astronaut.body.collides(asteroidCollisionGroup, this.hitAsteroid, this);
            astronaut.body.collides(fuelCollisionGroup, this.refuel, this);

            //ADD STARTTEXT
            start_text = game.add.text(gameProperties.screenWidth / 2, gameProperties.screenHeight / 2 - 70, start_text_content, fontStart);
            start_text.anchor.setTo(0.5);
            start_text.stroke = '#000000';
            start_text.strokeThickness = 5;

        },

        initCharacter: function () {
            astronaut = game.add.sprite(gameProperties.screenWidth / 2, gameProperties.screenHeight / 2, graphicAssets.astronautName);
            playerCollisionGroup = game.physics.p2.createCollisionGroup();
            astronaut.scale.setTo(0.5);
            astronaut.anchor.setTo(0.5);
            game.physics.p2.enable(astronaut);
            astronaut.body.setCollisionGroup(playerCollisionGroup);
            astronaut.enableBody = true;
            astronaut.body.immovable = false;
            astronaut.body.gravity.y = 800;
            astronaut.body.collideWorldbounds = false;
        },

        initGamePhysics: function () {
            game.physics.startSystem(Phaser.Physics.P2JS);
            game.physics.p2.setImpactEvents(true);
            game.physics.p2.gravity.y = 480;
            game.physics.p2.restitution = 0.15;
        },

        initInputKeys: function () {
            var start_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            start_key.onDown.add(this.runGame);

            var start_key_2 = game.input.keyboard.addKey(Phaser.Keyboard.W);
            start_key_2.onDown.add(this.runGame);

            var menu_key = game.input.keyboard.addKey(Phaser.Keyboard.M);
            menu_key.onDown.add(this.pauseMenu);
        },

        initTextContent: function () {
            if (isMobile) {
                start_text_content = "Touch to start!";
            } else {
                start_text_content = "Start Game 'SPACE' or 'W'";
            }
        },

        initAudio: function () {

            if(!noSound) {
                gameTrack = game.add.audio(soundAssets.gameTrackName);
            pickUpFuel = game.add.audio(soundAssets.refillName);
            bumpSound = game.add.audio(soundAssets.bumpSoundName);

                pickUpFuel.volume = 4;

                if (startPhase) {
                    gameTrack.restart();
                    gameTrack.loopFull();
                    startPhase = false;
                }
            }
        },

        initNewGame: function () {
            activeGame = false;
            fuel_max = 100;
            current_fuel = fuel_max;
            this.initHUD(current_fuel);
            current_score = 0;
            game.paused = true;
            if (isMobile) {
                initMobileControls();
            }
        },

        initHUD: function (fuel_tank) {
            $('#hud-holder').remove();

            $game_canvas = $('#astronautica');

            $game_canvas.append("<div id='hud-holder'></div>");
            $hud_holder = $('#hud-holder');

            //SCORE
            $hud_holder.append("<div id='the-score-display'></div>");
            $score_display = $('#the-score-display');
            $score_display.html(current_score);

            //FUEL BAR
            $hud_holder.append("<div id=fuel-bar></div>");
            $fuel_bar = $('#fuel-bar');

            $fuel_bar.append("<span id=fuel-bar-content></span>");
            $fuel_bar_content = $('#fuel-bar-content');
        },

        generateAsteroidRow: function () {
            game.time.events.loop(2000, function () {
                var count = 5;
                open = Math.floor((Math.random() * count));

                for (var i = 0; i < count; i++) {
                    if ((i != open)) {
                        this.createNewAsteroid(i * 83 + gameProperties.asteroidMargin, 0, graphicAssets.asteroidOrangeName, 200);
                    }
                }
                current_score += 50;
            }, this);
        },

        generateFuelItem: function () {
            game.time.events.loop(2500, function () {
                var spawnAt = Math.floor((Math.random() * 5));
                fuel = fuels.create(spawnAt * 83 + gameProperties.asteroidMargin, 30, 'fuel');
                fuel.body.setCollisionGroup(fuelCollisionGroup);
                fuel.body.collides([fuelCollisionGroup, playerCollisionGroup]);
                fuel.body.gravity.y = 100;
                
                fuel.checkWorldBounds = true;
                fuel.outOfBoundsKill = true;
                fuel.body.collideWorldBounds = false;
            }, this);
        },

        generateRedAsteroid: function () {
            game.time.events.loop(5000, function () {
                current_score += 75;
                var spawnAt = Math.floor((Math.random() * 5));

                this.createNewAsteroid(spawnAt * 83 + gameProperties.asteroidMargin, 0, graphicAssets.asteroidRedName, 600);
            }, this);
        },

        generateGreenAsteroid: function () {
            game.time.events.loop(2000, function () {
                current_score += 50;

                var count = 2;
                for (var i = 0; i < count; i++) {
                    var spawnAt = Math.floor((Math.random() * 5));
                    if ((spawnAt != open) && (spawnAt != purpleAsteroidPosition)) {
                        this.createNewAsteroid(spawnAt * 83 + gameProperties.asteroidMargin, 0, graphicAssets.asteroidGreenName, 400);
                    }
                }
            }, this);
        },

        generatePurpleAsteroid: function () {
            game.time.events.loop(7000, function () {
                current_score += 50;

                var spawnAt = Math.floor((Math.random() * 5));
                purpleAsteroidPosition = spawnAt;
                if (spawnAt != open) {
                    this.createNewAsteroid(spawnAt * 83 + gameProperties.asteroidMargin, 0, graphicAssets.asteroidPurpleName, 400);
                }
            }, this);
        },

        createNewAsteroid: function (x, y, asteroidSprite, speed) {
            var asteroid = asteroids.create(x, y, asteroidSprite);
            asteroid.scale.setTo(1.3);
            asteroid.body.setCollisionGroup(asteroidCollisionGroup);
            asteroid.body.static = true;
            asteroid.body.collides([asteroidCollisionGroup, playerCollisionGroup]);
            asteroid.body.velocity.y = speed;
            
            asteroid.checkWorldBounds = true;
            asteroid.outOfBoundsKill = true;
            asteroid.body.collideWorldBounds = false;
        },

        runGame: function () {
            if (activeGame == false) {
                game.paused = false;
                activeGame = true;
            }

        },

        //HANDLES PAUSE MENU
        pauseMenu: function () {
            if (game.paused === false) {
                game.paused = true;
                displayMenu();
            } else if (activeGame) {
                game.paused = false;
                hideMenu();
            }
        },

        refuel: function () {
            var fill_amount = 20;

            if (isMobile) {
                fill_amount = 2.5;
            }

            if (current_fuel + fill_amount > fuel_max) {
                current_fuel = fuel_max;
            } else {
                current_fuel += fill_amount;
            }
            if(!noSound) {
                pickUpFuel.play();
            }
            fuel.kill();
        },

        hitAsteroid: function () {
            if(!noSound) {
                bumpSound.play();
            }
        },

        boost: function () {
            if (current_fuel > 0) {
                current_fuel -= 0.35;
                astronaut.body.velocity.y = -225;
            }
        },

        //CALLED 60 TIMES PER SECOND (60FPS)
        update: function () {

            //KEYBOARD INPUT
            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                astronaut.body.moveLeft(400);
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                astronaut.body.moveRight(400);
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                this.boost();
            }

            //DEAL WITH BORDERS
            if (astronaut.body.y > gameProperties.screenHeight) {
                game.state.start('End');
            }

            if (astronaut.body.x < 40) {
                astronaut.body.x = 40;
            }

            if (astronaut.body.x > gameProperties.screenWidth - 40) {
                astronaut.body.x = gameProperties.screenWidth - 40;
            }

            if (astronaut.body.y <= 60) {
                astronaut.body.y = 60;
            }

            if (game.paused === false) {
                start_text.destroy();
            }

            $score_display.html(current_score);
            $fuel_bar_content.width(current_fuel + '%');
        }
    };

    //HANDLE PAUSE BUTTON
    var retryButton = document.getElementById('retry');
    retryButton.addEventListener("click", function () {
        runGame();
        game.state.start('Game');
        hideMenu();
    });

    var continueButton = document.getElementById('continue');
    continueButton.addEventListener('click', function () {
        runGame();
        hideMenu();
    });

    var menuButton = document.getElementById('menu-menu');
    menuButton.addEventListener('click', function () {
        runGame();
        hideMenu();
        game.state.start('Menu');
    });

    var runGame = function() {
        game.paused = false;
    };

    //ADD STATES TO GAME
    game.state.add('Game', GameState);
    game.state.add('End', EndOfGameState);
    game.state.add('Menu', MenuState);
    game.state.add('Characters', ChooseCharacterState);

    game.state.start('Menu');
});
