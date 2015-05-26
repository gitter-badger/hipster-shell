# hipster-shell

[![Join the chat at https://gitter.im/oNaiPs/hipster-shell](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/oNaiPs/hipster-shell?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
**UNIX-based command line interpreter**

## Goals
To have a fully functional command line shell that is fast and easily extendable with Javascript.

### Comparison to regular shells
The idea of making a command line interpreter in javascript might seem counter intuitive.

Why do we use bash scripting when we can have javascript?

#### Advantages
* Faster development times when compared to C/C++ implemented shells
* Huge developer base (leads to more contributions, more code analysis)
* Javascript plugins/modules, faster to execute than to interpret shell ones
* ...

#### Disadvantages
* Higher memory footprint (when compared to C/C++ implemented shells)
	* We have to run the node runtime
	* Perhaps we could share the runtime with several shell instances
* ...

## Performance guide
1. All commands use streams to pass buffer data
2. ...

## Development guide
Fast guide to start development on the hipster-shell:

1. Clone this repository
2. Install dependencies with `npm install`
3. Watch for changes in the files with `gulp serve`
4. ...

## TODO
Check our [TODO](TODO.md) list

## Project Team Members

* **Jose Pereira** ([@onaips](https://github.com/oNaiPs)) &lt;onaips@gmail.com&gt;
* **Jean-Baptiste Souvestre** ([@jbsouvestre](https://github.com/jbsouvestre)) &lt;jbsouvestre@gmail.com&gt;
