twitterDumper
=============

Dump twitter from the stream api and dump data in database, files, anything with connectors

Usage
==

To use the dumper, you need to change the configuration of the stream API (oauth protocole) in the file ./config/default.json or create one ./config/hostname.json where hostname is...your hostname

Still in the ./config/default.json (or your), you can change the configuration for connectors, only mongoDB exists for the moment but it's easy to create new connectors for your needs.

Create connector
==
It's very easy, just need to copy an existing connector and adapt the functions init and save.
If you need configuration values, use the config file and please, share your connectors, these can save few minutes to other people :).

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/stumpyfr/twitterdumper/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

