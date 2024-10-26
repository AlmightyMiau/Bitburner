const HOME = "home";

/** @param {NS} ns */
export async function main(ns) {
    let target = "home";
    let thread = 1;
    const scriptRam = 2.4;

    // Determine whether or not to enable logging
    let debug = ns.args[0];
    ns.disableLog("ALL");

    // What percentage of our hacking level should a server be before using it
    let lvlpercent = ns.args[1];

    // List of targets for each level of exe function
    const targets = [
        "deltaone",
        "global-pharm",
        "rho-construction",
        "the-hub",
        "iron-gym",
        "harakiri-sushi"
    ];

    // List of exe functions
    const exes = [
        "SQLInject.exe",
        "HTTPWorm.exe",
        "RelaySMTP.exe",
        "FTPCrack.exe",
        "BruteSSH.exe",
        "NUKE.exe"
    ];

    // Array of all purchased servers
    //  Varying RAM sizes
    const pservers = [
        "pserv-0",
        "pserv-1",
        "pserv-2",
        "pserv-3",
        "pserv-4",
        "pserv-5",
        "pserv-6",
        "pserv-7",
        "pserv-8",
        "pserv-9",
        "pserv-10",
        "pserv-11",
        "pserv-12",
        "pserv-13",
        "pserv-14",
        "pserv-15",
        "pserv-16",
        "pserv-17",
        "pserv-18",
        "pserv-19",
        "pserv-20",
        "pserv-21",
        "pserv-22",
        "pserv-23",
    ];


    // Array of all servers that don't need any ports opened
    // to gain root access. These have  GB of RAM
    const servers0Port = [
        "n00dles",
        "foodnstuff",
        "sigma-cosmetics",
        "joesguns",
        "nectar-net",
        "hong-fang-tea",
        "harakiri-sushi"
    ];


    // Array of all servers that only need 1 port opened
    // to gain root access. These have 32 GB of RAM
    const servers1Port = [
        "neo-net",
        "zer0",
        "max-hardware",
        "iron-gym",
        "CSEC"
    ];


    // 2 port servers
    const servers2Port = [
        "omega-net",
        "silver-helix",
        "phantasy",
        "johnson-ortho",
        "crush-fitness",
        "the-hub",
        "avmnite-02h"
    ];

    // 3 port servers
    const servers3Port = [
        "netlink",
        "computek",
        "I.I.I.I",
        "summit-uni",
        "catalyst",
        "rothman-uni",
        "millenium-fitness",
        "rho-construction"
    ];

    const servers4Port = [
        "aevum-police",
        "global-pharm",
        "syscore",
        "lexo-corp",
        "unitalife",
        "snap-fitness",
        "alpha-ent",
        "univ-energy",
        "nova-med",
        "zb-def"
    ];

    // 5 port servers
    const servers5Port = [
        "zb-institute",
        "galactic-cyber",
        "aerocorp",
        "omnia",
        "deltaone",
        "taiyang-digital",
        "icarus",
        "zeus-med",
        "infocomm",
        "solaris",
        "defcomm"
    ];
    
    // //decide the target
    // // Cycle through each .exe file for a match
    // for (let i = 0; i < exes.length; i++) {
    //     // if the file doens't exist yet, look at the next file
    //     if (ns.fileExists(exes[i]) && (ns.getServerRequiredHackingLevel(targets[i]) <= (ns.getHackingLevel() * lvlpercent))) {
    //         // the file exists, so the target is now the best target of that file
    //         target = targets[i];
    //         break;
    //     }
    // }
    // // List the target in the logs
    // ns.print("target: ", target);
    // root(ns, target);

    // // Hack from the home server
    // if (ns.serverExists("home")) {
    //     const serv = "home";
    //     ns.print("Hacking using: ", serv);
    //     thread = threads(ns, serv, scriptRam, thread);
    //     if (thread > 0) {
    //         hax(ns, serv, target, thread, true);
    //     }
    // }

    // // DEBUGGING: uncomment the following line to find logs for the above code
    // if (debug) {
    //     await ns.sleep(60000);
    // }
    // // Copy our scripts onto each server that requires 0 ports
    // // to gain root access. Then use nuke() to gain admin access and
    // // run the scripts.
    // for (let i = 0; i < servers0Port.length; ++i) {
    //     const serv = servers0Port[i];
    //     ns.print("Hacking using: ", serv);
    //     root(ns, serv);
    //     thread = threads(ns, serv, scriptRam, thread);
    //     if (thread > 0) {
    //         hax(ns, serv, target, thread, debug);
    //     }
    // }

    // // Wait until we acquire the "BruteSSH.exe" program
    // if (!ns.fileExists("BruteSSH.exe")) {
    //     ns.print("Waiting for BruteSSH.exe");
    //     ns.exit();
    // }

    // // Copy our scripts onto each server that requires 1 port
    // // to gain root access. Then use brutessh() and nuke()
    // // to gain admin access and run the scripts.
    // for (let i = 0; i < servers1Port.length; ++i) {
    //     const serv = servers1Port[i];

    //     ns.print("Hacking using: ", serv);
    //     root(ns, serv);
    //     thread = threads(ns, serv, scriptRam, thread);
    //     if (thread > 0) {
    //         hax(ns, serv, target, thread, debug);
    //     }
    // }

    // // Wait until we acquire the "BruteSSH.exe" program
    // while (!ns.fileExists("FTPCrack.exe")) {
    //     ns.print("Waiting for FTPCrack");
    //     ns.exit();
    // }

    // // Copy our scripts onto each server that requires 1 port
    // // to gain root access. Then use brutessh() and nuke()
    // // to gain admin access and run the scripts.
    // for (let i = 0; i < servers2Port.length; ++i) {
    //     const serv = servers2Port[i];

    //     ns.print("Hacking using: ", serv);
    //     root(ns, serv);
    //     thread = threads(ns, serv, scriptRam, thread);
    //     if (thread > 0) {
    //         hax(ns, serv, target, thread, debug);
    //     }
    // }


    // //Run hack scripts from purchased servers
    // for (let i = 0; i < pservers.length; ++i) {
    //     while (!ns.serverExists(pservers[i])) {
    //         ns.print("Server ", pservers[i], " doesn't exist yet");
    //         await ns.sleep(60000);
    //     }
    //     const serv = pservers[i];

    //     ns.print("Hacking using: ", serv);
    //     thread = threads(ns, serv, scriptRam, thread);
    //     if (thread > 0) {
    //         hax(ns, serv, target, thread, debug);
    //     }
    // }

    // while (!ns.fileExists("RelaySMTP.exe")) {
    //     ns.print("Waiting for RelaySMTP");
    //     ns.exit();
    // }

    // for (let i = 0; i < servers3Port.length; ++i) {
    //     const serv = servers3Port[i];

    //     ns.print("Hacking using: ", serv);
    //     root(ns, serv);
    //     thread = threads(ns, serv, scriptRam, thread);
    //     if (thread > 0) {
    //         hax(ns, serv, target, thread, debug);
    //     }
    // }

    const servers = [
        servers0Port,
        servers1Port,
        servers2Port,
        servers3Port,
        servers4Port,
        servers5Port,
    ];

    let hacked = [];

    ns.clearLog();
    ns.tail();
    ns.moveTail(0,0);
    ns.resizeTail(1350, 600);
    ns.print("DONT DO ANYTHING DONT DO ANYTHING DONT DO ANYTHING DONT DO ANYTHING \n\n\n\n\n\n\n\n\n\n\n\n");
    await ns.sleep(1000);

    for (let i = 0; i < servers.length; i++) {
        for (let j = 0; j < servers[i].length; j++) {
            if (!ns.hasRootAccess(servers[i][j])) {
                ns.brutessh(servers[i][j]);
                ns.ftpcrack(servers[i][j]);
                ns.relaysmtp(servers[i][j]);
                ns.httpworm(servers[i][j]);
                ns.sqlinject(servers[i][j]);
                while (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(servers[i][j])) {
                    await ns.sleep(6000);
                }
                ns.nuke(servers[i][j]);
                ns.print("Gained root access to ", servers[i][j]);
            }
            if (!ns.getServer(servers[i][j]).backdoorInstalled) {
                ns.singularity.connect(HOME);
                await ns.sleep(100);

                let result = [];
                let route = [];
                
                buildRoute(ns, HOME, servers[i][j], route)
                result = await printRoute(ns, route);
                
                for (let n = 0; n < result.length; n++) {
                    ns.singularity.connect(result[n]);
                    await ns.sleep(100);
                }
                await ns.singularity.installBackdoor();
                ns.singularity.connect(HOME);
            }
            hacked.push(servers[i][j]);
        }
    }

    await ns.sleep(1000);
    ns.clearLog();
    ns.moveTail(500, 300);
    ns.resizeTail(300, 100);
    ns.print("Backdoors installed");



}

function buildRoute(ns, parent, target, route, seen = []) {
    //first time we run we need to add the parent to the list of servers we've seen
    if (!seen.includes(parent)) {
        seen.push(parent);
	}
    //add to route
    route.push(parent);
    const children = ns.scan(parent);
    for (const child of children) {
        if (seen.includes(child)) {
            //already checked
            continue;
        }
        seen.push(child);
        if (child == target) {
            //found target, add it to the route and finish recursion
            route.push(child);
            return true;
        }
        if (buildRoute(ns, child, target, route, seen)) {
            //target found, finish recursion
            return true;
        }
        else {
            //target not found in this branch, remove from route
            route.pop();
        }
    }
    //didn't find target in this route, reset route
    route = [];
    return false;
}
async function printRoute(ns, route) {
    let result = [];
    for (const node of route) {
        result.push(node);
    }
    return result;
}
function root(ns, target) {
	
}
