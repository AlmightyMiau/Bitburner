/** @param {NS} ns */
export async function main(ns) {
	let target = "home";
    let thread = 1;
    const scriptRam = 2.4;

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
        "iron-gym"
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

    // 4 port serves
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

    //decide the target

	for (let i = 0; i < servers0Port.length; ++i) {
		const serv = servers0Port[i];
        if (ns.getServerMaxMoney(serv) > ns.getServerMaxMoney(target)) {
            target = serv;
        }
	}
	ns.print("Weak target acquired");
	ns.write("targets.txt", "Weak target: " + target, "w");


	for (let i = 0; i < servers1Port.length; ++i) {
		const serv = servers1Port[i];
        if (ns.getServerMaxMoney(serv) > ns.getServerMaxMoney(target)) {
            target = serv;
        }
	}
	ns.print("SSH target acquired");
	ns.write("targets.txt", "\nSSH target: " + target, "a");


	for (let i = 0; i < servers2Port.length; ++i) {
		const serv = servers2Port[i];
        if (ns.getServerMaxMoney(serv) > ns.getServerMaxMoney(target)) {
            target = serv;
        }
	}
	ns.print("FTP target acquired");
	ns.write("targets.txt", "\nFTP target: " + target, "a");


	for (let i = 0; i < servers3Port.length; ++i) {
		const serv = servers3Port[i];
        if (ns.getServerMaxMoney(serv) > ns.getServerMaxMoney(target)) {
            target = serv;
        }
	}
	ns.print("SMTP target acquired");
	ns.write("targets.txt", "\nSMTP target: " + target, "a");


	for (let i = 0; i < servers4Port.length; ++i) {
		const serv = servers4Port[i];

        if (ns.getServerMaxMoney(serv) > ns.getServerMaxMoney(target)) {
            target = serv;
        }
	}
	ns.print("HTTP target acquired");
	ns.write("targets.txt", "\nHTTP target: " + target, "a");


    for (let i = 0; i < servers5Port.length; ++i) {
		const serv = servers5Port[i];

        if (ns.getServerMaxMoney(serv) > ns.getServerMaxMoney(target)) {
            target = serv;
        }
	}
	ns.print("SQL target acquired");
	ns.write("targets.txt", "\nSQL target: " + target, "a");


	ns.tprint("targets found. Ending process.");
	ns.exit();
}