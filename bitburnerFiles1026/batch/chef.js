/** @param {NS} ns */
export async function main(ns) {
	let servers = ns.read("moneyServers.txt").split('\n');
	for (let i = 0; i < servers.length; i--) {
		ns.print(servers[i]);
		let money = ns.getServerMaxMoney(servers[i]);
		ns.print(money);              // Money
		ns.print(750);                // second
		ns.print(money * 1000 / 750); // Money per second
		let timeLive = ns.getWeakenTime(servers[i]) + 750; // Time each batch.js is alive
		
	}
}