function Hesitate(context, opts) { 

    if(context._hesitate) { 
        return context._hesitate;
    }

    var _hesitate = this;
    context._hesitate = this;
    this.attempts = 0;
    this.max = opts.max === undefined ? 10 : opts.max;
    this.wait = (opts.wait || 1000);
    this.backoff = (opts.backoff || false);
    this.scale = (opts.scale || 1.2);
    this.logger = (opts.logger || function() {});

    this.loiter = function(func, args) { 
        this.attempts++;
        if(this.max !== null && this.attempts > this.max) { 
            this.logger("max attempts reached");
            if(typeof(process)!=='undefined')
                process.exit();
            else
                return;
        };
        this.backoff ? this.wait = parseInt(this.wait * this.scale) : this.wait = this.wait;
        this.logger("attempt %s of %s (wait %s ms)", this.attempts, (this.max || 'infinite'), this.wait);
        setTimeout(runner, this.wait);
        function runner() { 
            func.apply(context, (args !== undefined ? Array.prototype.slice.call(args) : undefined));
        }
    };

};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Hesitate;
else
    window.Hesitate = Hesitate;
