function Hesitate(context, opts) { 

    if(context.hesitate) { 
        return context.hesitate;
    }

    var hesitate = this;
    context.hesitate = this;
    this.attempts = 0;
    this.max = (opts.max || 10);
    this.wait = (opts.wait || 1000);
    this.backoff = (opts.backoff || false);
    this.scale = (opts.scale || 1.2);

    this.loiter = function(func, args) { 
        this.attempts++;
        if(this.max !== null && this.attempts > this.max) { 
            console.log("max attempts reached");
            if(typeof(process)!=='undefined')
                process.exit();
            else
                return;
        };
        this.backoff ? this.wait = parseInt(this.wait * this.scale) : this.wait = this.wait;
        console.log("attempt %s of %s (wait %s ms)", this.attempts, this.max, this.wait);
        setTimeout(runner, this.wait);
        function runner() { 
            func.apply(context, Array.prototype.slice.call(args));
        }
    };

};