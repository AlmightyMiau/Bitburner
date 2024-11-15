# README.md

## folders
|Folder|Description|
|------|-----------|
|**main**|Files used in multiple folders, or that should easily accessible|
|**start**|Scripts that run automatically upon install|
|**batch**|Set of scripts to use the hack-weaken-grow-weaken with minimal downtime|
|**misc**|Set of files for use by user|
|**stocks**|Scripts for buy, selling, and manipulating stocks|
|**servers**|Lists of servers of each port level|

## main
| Script | Description |
| --------- | ----------|
|**start.js**|primary script that runs after every augment install|
|**hack.js**|continuously hacks a target server|
|**moneyServers.txt**|list of servers with money|

## start/
| Script | Description |
| ------ | ----------- |
|**augbaseprice.txt**|stores the base price of the `Neuroflux Govenor` augmentation after installing|
|**augments.js**|buys augments as they are available|
|**buyservers.js**|buys purachasable servers and upgrades them|
|**hacker.js**|hacks every server|
|**hacknet2.js**|hacknet manager that buys and upgrades hacknet nodes|
|**home.js**|upgrades home ram and cores, and joins factions as available|
|**milestones.js**|backdoors faction servers as available|
|**root.js**|runs all .exe's on all servers, enabling hacking of them|
|**tempgrow.js**|runs `ns.grow()` once on a target server|
|**temphack.js**|runs `ns.hack()` once on a target server|

## batch/
| Script | Description |
| ------ | ----------- |
|**chef.js**|runs `batcher.js` on a few set servers|
|**batcher.js**|performs a hack-weaken-grow-weaken function with minimum downtime|
|**batch.js**|executes a single batch of hack-weaken-grow-weaken|
|**grow.js**|runs `ns.grow()` once on a target server|
|**hack.js**|runs `ns.hack()` once on a target server|
|**weaken.js**|runs `ns.weaken()` once on a target server|

## misc/
| Script | Description |
| ------ | ----------- |
|**autoinfiltrate.js**|run to enable automatic infiltration of companies|
|**delete.js**|deletes a currently owned server|
|**install.js**|installs augmentations and runs `start.js`|
|**monitor.js**|monitors a server, player cash, or a batcher script|
|**route.js**|displays the route to a server in the terminal|
|**run.js**|runs a script on a server at the maximum threads possible|
|**servers.txt**|a list of all servers|
|**target.js**|finds the target server with the most money for a given port level|
|**targets.js**|finds all servers with money on them|
|**targets.txt**|list of servers with the most money for a given port level|
|**test.js**||
|**threads.js**|prints the number of threads needed to hack a server for the money available|

## stocks/
| Script | Description |
| ------ | ----------- |
|**liquidate.js**|sells all stocks|
|**maxprice.txt**|Holds the highest value of a stock|
|**minprice.txt**|Holds the lowest value of a stock|
|**stocks.js**|Finds stocks that are increasing and runs `stocker.js` on them|
|**stocker.js**|Monitors a single stock, manipulates prices by growing server, and sells high|
|**stockgains.txt**|Holds the gains from selling stocks|

## servers/
6 txt files containing list of servers based on how many ports are needed to hack them
## shell/
execute a line of code from the terminal with `java.js "code"`
