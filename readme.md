# Hesitate

Back-off and re-try for javascript functions (node.js and browser).

Sometimes a resource dependency (server process, web site, database process) is not available. The easiest thing to do would when you can't access a remote resource is to simply quit, but in multi-process distributed environments it's better to wait a while and try again. Each subsequent try should also back-off to try less and less often in order to avoid spinning furiously for a resource that may never come on line.

Hesitate allows a function to set itself to be re-called over and over again, with the same parameters, whilst other execution tasks continue.

# Use

Here's a function:

    function myFunction(a,b,c) { 

        var h = new Hesitate(this);

        if(critical_resource_not_available) {
            h.loiter(myFunction, arguments);
        }

    };

What this myFunction does is instantiate a new Hesitate object (h). And then set itself up to loiter (try again over and over) until either the resource comes online or a maximum number of attempts is reached.

    new Hesitate(this, options)

_this_ is passed so that Hesitate has a reference to the calling function state.

_options_ is an optional object containing:

    { 
        max:        100,      // maximum attempts before giving up, or null to try for ever. default: 10
        wait:       5000,     // intial wait between attempts in ms. default: 1000 ms
        backoff:    true,     // whether to backoff (increase wait time after each attempt). default: false
        scale:      2,        // scale multiplier for wait time at each attempt. default: 1.2 (20% increase)
        logger:     function  // logging function for status messages. default: none
    }

Calling _loiter_ on the Hesitate object sets up the retrys:

    h.loiter(function, arguments);

_function_ is function to call at each attempt (usually the same function name that started it), _arguments_ is javascript arguments object (usually just the same arguments for the current function).


