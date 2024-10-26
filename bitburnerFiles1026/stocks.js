/** @param {NS} ns */
export async function main(ns) {
	let manip = ns.args[0];
	if (manip == "-h" || manip == "help" || manip == "--help") {
		ns.tprint("arg 0 is the boolean, to manipulate prices or not. \n True uses more scripts");
		manip = false;
	}
	//ns.disableLog("sleep");
	const syms = ns.stock.getSymbols();
	while (true) {
		for (let i = 0; i < syms.length; i++) {
			let sym = syms[i];
			if (ns.stock.getForecast(sym) > 0.5 && !(ns.getRunningScript("stocker.js", "home", sym))) {
				if ((ns.stock.getAskPrice(sym) * ns.stock.getMaxShares(sym)) < ns.getServerMoneyAvailable("home")) {
					ns.exec("stocker.js", "home", 1, sym);
				}
			}
			await ns.sleep(1000);
		}
		await ns.sleep(1000);
	}
}

// look through all the stocks to see what is going up, and run stocker on whatever is
// 