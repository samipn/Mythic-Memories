class RiddlePuzzle extends Phaser.Scene {
    constructor() {
        super('riddlepuzzle');
    }

    preload() {
        this.load.path = "./assets/";	
        this.load.image('Npc', 'BetaApollo.png');	
    }

    create() {     
        this.currentQuestion = 0;
        this.answerArray = [];
        this.canAnswer = false;

        // Created Player
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(57,20);
        this.player.body.setOffset(7, 135);
        this.player.setDepth(playerDepth);

        this.playerInteractBox = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.playerInteractBox.body.setSize(57,20);
        this.playerInteractBox.body.setOffset(7, 135);
        this.playerInteractBox.visible = false;
        this.playerInteractBox.body.immovable = true;

        // Created Room walls
        this.walls = this.add.group();
        this.topWall = this.add.tileSprite(220, 50, wallSize * 8 * 12, wallSize * 12, 'Top Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.topWall);
        this.topWall.body.immovable = true;
        this.topWall.setDepth(envDepth);
        this.walls.add(this.topWall);

        this.botWall = this.add.tileSprite(220, 819, wallSize * 94, wallSize * 12 + 9, 'Bottom Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.botWall);
        this.botWall.body.setSize(wallSize * 94, 100);
        this.botWall.body.setOffset(0, 100);
        this.botWall.body.immovable = true;
        this.botWall.setDepth(3);
        this.walls.add(this.botWall);

        this.leftWall = this.add.sprite(100, 50, 'Left Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.immovable = true;
        this.leftWall.setDepth(envDepth);
        this.walls.add(this.leftWall);

        this.rightWall = this.add.sprite(1820 - (wallSize*SCALE), 50, 'Right Wall').setScale(1).setOrigin(1,0);
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.immovable = true;
        this.rightWall.setDepth(envDepth);
        this.walls.add(this.rightWall);

        this.floor = this.add.tileSprite(220, 50 + wallSize * 12, 1455, 700, 'Floor').setScale(1.02).setOrigin(0);
        this.floor.setDepth(envDepth);
        
        // Create hub door
        this.hubDoor = this.physics.add.sprite(game.config.width/2, 950, 'Door').setOrigin(0.5).setScale(3);
        this.hubDoor.body.immovable = true;
        this.hubDoor.body.setSize(30,60);
        this.hubDoor.body.setOffset(35, 17);
        this.hubDoor.setAngle(180);
        this.hubDoor.setDepth(objectDepth);

        // Create Artifact (Level Complete)
        this.scroll = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Scroll').setOrigin(0.5);
        this.scroll.body.immovable = true;
        this.scroll.body.enable = false;
        this.scroll.visible = false;
        
        // Created Answer Buttons
        this.answerButtons = this.add.group();

        this.answerButtonA = this.physics.add.sprite(450, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.answerButtonA.name = "A";
        this.answerButtonA.body.immovable = true; 
        this.answerButtons.add(this.answerButtonA);

        this.answerButtonB = this.physics.add.sprite(750, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.answerButtonB.name = "B";
        this.answerButtonB.body.immovable = true; 
        this.answerButtons.add(this.answerButtonB);

        this.answerButtonC = this.physics.add.sprite(1050, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.answerButtonC.name = "C";
        this.answerButtonC.body.immovable = true; 
        this.answerButtons.add(this.answerButtonC);

        this.answerButtonD = this.physics.add.sprite(1350, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.answerButtonD.name = "D";
        this.answerButtonD.body.immovable = true; 
        this.answerButtons.add(this.answerButtonD);

        // Create NPC
        this.Npc = this.physics.add.sprite(1600, 700, 'Npc').setOrigin(0.5).setScale(1);
        this.Npc.body.immovable = true;

        // Create riddles
        this.npcText = this.add.text(225, 220, "In order to complete this puzzle you must answer my riddles", {
            fontSize: 40,
            fill: '#000000',
        });
        this.npcText.visible = false;
        this.npcText.setDepth(objectDepth);
        
        this.riddle1 = this.add.text(225, 220, "What musical instrument doesn't tell the truth? \nA. Lute \nB. Lyre \nC. Harp \nD. Piano", {
                fontSize: 40,
                fill: '#000000',
        });
        this.riddle1.visible = false;
        this.riddle1.setDepth(objectDepth);

        this.riddle2 = this.add.text(225, 220, "Though made of wood, I hold strength untold. \nWith tension and release, my purpose unfolds. \nA. Bow \nB. Spoon \nC. Chair \nD. Door", {
            fontSize: 40,
            fill: '#000000',
        });
        this.riddle2.visible = false;
        this.riddle2.setDepth(objectDepth);

        this.riddle3 = this.add.text(225, 220, "What can bring back the dead; make you cry, make you laugh, \nmake you young; is born in an instant, yet lasts a lifetime. \nA. Time \nB. Potion \nC. Memory \nD. Grim Reaper", {
            fontSize: 40,
            fill: '#000000',
        });
        this.riddle3.visible = false;
        this.riddle3.setDepth(objectDepth);

        // Inventory GUI
        //this.updateInventory();
        let invRect = this.add.rectangle(1750, 950, 400, 300, 0x000000);
        invRect.setDepth(envDepth);
        this.add.text(1570, 820, "Inventory", {fontSize: 40});

        //Player physics
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.answerButtons);
        this.physics.add.collider(this.player, this.Npc);

        // Player hitbox physics
        this.physics.add.overlap(this.playerInteractBox, this.Npc, this.npcInteract, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.answerButtons, this.checkAnswer, null, this);
        this.physics.add.overlap(this.player, this.hubDoor, this.interactDoor, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.scroll, this.pickUp, null, this);
    }

    update() {
        // Have interact hitbox follow player
        this.playerInteractBox.x = this.player.x;
        this.playerInteractBox.y = this.player.y;

        // Y Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
            // W key is currently being pressed
            this.player.setVelocityY(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,50);
            this.playerInteractBox.body.setOffset(0,50);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            // S key is currently being pressed
            this.player.setVelocityY(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,50);
            this.playerInteractBox.body.setOffset(0,120);
        }
        else {
            this.player.setVelocityY(0);
        }
        
        // X Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            // A key is currently being pressed
            this.player.setVelocityX(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,120);
            this.playerInteractBox.body.setOffset(-70,0);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            // D key is currently being pressed
            this.player.setVelocityX(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,120);
            this.playerInteractBox.body.setOffset(70,0);
        }
        else {
            this.player.setVelocityX(0);
        }    
    }

    npcInteract() {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.currentQuestion == 0) {
            this.chatBubble = this.add.rectangle(205, tileSize*SCALE*2, 1490, 300, 0xFFF8DC).setOrigin(0);
            this.physics.add.existing(this.chatBubble);
            this.chatBubble.body.immovable = true;
            this.chatBubble.setDepth(envDepth);
            this.npcText.visible = true;
            this.physics.add.collider(this.player, this.chatBubble);
            this.time.delayedCall(5000, () => {
                this.currentQuestion = 1;
                this.canAnswer = true;
                this.npcText.destroy();
                this.riddle1.visible = true;
            });
            // npcInteract FINSIHED DEAD FIRST QUESTION IS DONE
        }
    }

    checkAnswer(hitbox, answer) {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.currentQuestion == 1 && this.canAnswer == true) {
            this.answerArray.push(answer.name);
            this.riddle1.visible = false;
            this.canAnswer = false;
            this.time.delayedCall(500, () => {
                this.currentQuestion = 2;
                this.canAnswer = true;
                this.riddle2.visible = true;
            });
            console.log(this.answerArray);
            // SECOND
        } 
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.currentQuestion == 2 && this.canAnswer == true) {
            this.answerArray.push(answer.name);
            this.riddle2.visible = false;
            this.canAnswer = false;
            this.time.delayedCall(500, () => {
                this.currentQuestion = 3;
                this.canAnswer = true;
                this.riddle3.visible = true;
            });
            console.log(this.answerArray);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.currentQuestion == 3 && this.canAnswer == true) {
            this.answerArray.push(answer.name);
            this.riddle3.visible = false;
            this.canAnswer = false;
            if (this.answerArray[0] == 'B' && this.answerArray[1] == 'A' && this.answerArray[2] == 'C') {
                console.log("npc dialogue, create artifact, spawn artifact, look musicpuzzle");
                console.log("flashback, exit room");
                this.scroll.body.enable = true;
                this.scroll.visible = true;
            }
            else {
                // retry bozo
                console.log("You FAILED");
                this.time.delayedCall(500, () => {
                    this.currentQuestion = 1;
                    this.riddle1.visible = true;
                    this.canAnswer = true;
                    this.answerArray = [];
                });
            }
            console.log(this.answerArray);
        }
    }

    interactDoor(player, door) {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown) {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('centralhub');
            });
        }
    }

    updateInventory() {
        if(inventory.length > 0) {
            this.inventoryArtifact = this.add.sprite(1700,960, inventory[0]).setScale(1.5);
            this.inventoryArtifact.setDepth(objectDepth);
            console.log(this.inventoryArtifact);
        } else {
            this.inventoryArtifact.destroy();
        }
    }

    pickUp () {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown) {
            inventory.push('Scroll');
            this.scroll.body.enable = false;
            this.scroll.visible = false;
            this.updateInventory();
        }
    }
}