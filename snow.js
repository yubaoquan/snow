(function() {
    var snows = [];
    var canvas, ctx;
    var paused = false;
    var MAX_WIDTH, MAX_HEIGHT;
    var drawCount = 0;
    var snowShapes = ['!', '@', '#', '$', '%', '^', '&', '*', '`', '?'];

    function resetWH() {
        canvas.width = MAX_WIDTH = window.screen.availWidth;
        canvas.height = MAX_HEIGHT = top.innerHeight;
        canvas.style.height = canvas.height + 'px';
    }

    function createCanvas() {
        var d = document.createDocumentFragment();
        canvas = document.createElement('canvas');
        canvas.style.cssText = "width: 100%; height: 500px; position: fixed; top: 0; left: 0; pointer-events: none;";
        ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000';
        // ctx.font = 'normal lighter 50px cursive';
        d.appendChild(canvas);
        document.body.append(d);

        window.addEventListener('resize', resetWH);
        resetWH();
    }

    function Snow(x) {
        this.x = Math.random() * MAX_WIDTH;
        this.y = Math.random() * 100;
        this.speed = 1 + Math.random() * 5;
        this.id = '' + Date.now() + Math.random();
        this.shape = snowShapes[Math.floor(Math.random() * snowShapes.length)];
    }
    Snow.prototype.move = function() {
        this.y += this.speed;
        if (this.y > MAX_HEIGHT) {
            this.remove();
        } else {
            this.draw();
        }
    };
    Snow.prototype.remove = function() {
        snows = snows.filter(function(snow) {
            return snow.id != this.id;
        }.bind(this));
    };
    Snow.prototype.draw = function() {
        ctx.fillText(this.shape, this.x, this.y);
    };

    function draw() {
        if (!paused) {
            while (snows.length < 50) {
                snows.push(new Snow());
            }
            ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
            snows.forEach(function(snow) {
                snow.move();
            });
        };
        drawCount = drawCount ++ % 10;
        if (!drawCount) {
            requestAnimationFrame(draw);
        }
    }

    function addSnow() {
        var snowNum = 10;
        while (snowNum -- && !paused) {
            snows.push(new Snow());
        }
        var interval = Math.random() * 1000;
        setTimeout(addSnow, interval);
    }

    function init() {
        createCanvas();
        addSnow();
        draw();
        play();
    }

    function play() {
        paused = false;
    }
    function pause() {
        paused = true;
    }
    function clear() {
        ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
        snows = [];
    }
    function setSnowShapes(shapes) {
        clear();
        snowShapes = shapes;
    }
    init();
    window.Snow = {
        play: play,
        pause: pause,
        clear: clear,
        setSnowShapes: setSnowShapes
    }
}())
