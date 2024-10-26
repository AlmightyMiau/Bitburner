/** @param {NS} ns */
export async function main(ns) {
	const sym = ns.args[0];
	const target = ns.args[1];
	let manip = ns.args[2];
	let debug = ns.args[3];
	let pricebought;
	let pricesold;
	debug = true;
	
	const maxmoney = 0;
	if (sym === undefined) {
		ns.print("arg 0 is the stock symbol");
		ns.exit();
	} else if (sym == "--help" || sym == "help" || sym == "-h") {
		ns.tprint("\n script that buys stocks and sells high.\n 1st arg is the stock symbol.\n 2nd arg is the stock's server.\n 3rd arg is whether to hack and grow servers to manipulate stock prices.");
		ns.exit();
	}
	if (target === undefined) {
		ns.print("arg 1 is the target server");
	} else {
		maxmoney = ns.getServerMaxMoney(target);
	}
	if (manip === undefined) {
		ns.print("arg 2 is boolean, proceeding with false");
		manip = false;
	}
	if (debug === undefined) {
		ns.print("arg 3 is debug; turning off");
		debug = false;
	}
	let minprice = Number(ns.read("minprice.txt"));
	let maxprice = Number(ns.read("maxprice.txt"));
	const buyprice = minprice;
	const sellprice = maxprice;
	let shares = ns.stock.getMaxShares(sym);
	//const minprice = ns.stock.
	ns.disableLog("sleep");

	if (manip == true) {
		while (true) {
			// Hack foodnstuff to bring price down
			if (ns.getServerMoneyAvailable(target) != 0) {
				ns.print("bringing price down.");
				while (ns.getServerMoneyAvailable(target) != 0) {
					ns.exec("run.js", "home", 1, target, "temphack.js");
					await ns.sleep(5000);
				}
			}
			// after price is down, buy max stock
			// homemade place order command
			if (ns.stock.getAskPrice(sym) > buyprice) {
				ns.print("Waiting for price to drop");
				while (ns.stock.getAskPrice(sym) > buyprice) {
					ns.print(Floor(ns.stock.getAskPrice(sym)));
					await ns.sleep(60000);
					if (ns.stock.getAskPrice(sym) < minprice) {
						minprice = ns.stock.getAskPrice(sym);
						ns.write("minprice.txt", minprice, "w");
					} else if (ns.stock.getBidPrice(sym) > maxprice) {
						maxprice = ns.stock.getBidPrice(sym);
						ns.write("maxprice.txt", maxprice, "w");
					}
				}
			}
			ns.stock.buyStock(sym, shares);
			// after bought, raise price with grow
			if (ns.getServerMoneyAvailable(target) < maxmoney) {
				ns.print("bringing price up.");
				while (ns.getServerMoneyAvailable(target) < maxmoney) {
					ns.exec("run.js", "home", 1, target, "tempgrow.js");
					await ns.sleep(5000);
				}
			}
			// after raising price, sell all stock
			if (ns.stock.getBidPrice(sym) < sellprice) {
				ns.print("Waiting for price to increase");
				while (ns.stock.getBidPrice(sym) < sellprice) {
					ns.print(Floor(ns.stock.getBidPrice(sym)));
					await ns.sleep(60000);
					if (ns.stock.getBidPrice(sym) > maxprice) {
						maxprice = ns.stock.getBidPrice(sym);
						ns.write("maxprice.txt", maxprice, "w");
					} else if (ns.stock.getAskPrice(sym) < minprice) {
						minprice = ns.stock.getAskPrice(sym);
						ns.write("minprice.txt", minprice, "w");
					}
				}
			}
			ns.stock.sellStock(sym, shares);
			//repeat after 10 seconds
			await ns.sleep(10000);
		}
	} else {
		let bought = 0;
		if (bought == 0) {

			if (debug) {log(ns, sym);}
			while (bought == 0) {
				// if price is going up
				if (debug) {ns.print("Forecast for ", sym, ": ", (ns.stock.getForecast(sym)).toFixed(2));}
				if (ns.stock.getForecast(sym) > 0.5) {
					ns.stock.buyStock(sym, shares);
					pricebought = ns.stock.getAskPrice(sym) * shares;
					bought++;
					break;
				}
				await ns.sleep(6000);
			}
		} if (bought == 1) {
			if (debug) {ns.print("Waiting for forecast to show going down.");}
			while (bought == 1) {
				// log window messages
				if (debug) {log(ns, sym);}
				if (ns.stock.getForecast(sym) < 0.5) {
					ns.stock.sellStock(sym, shares);
					pricesold = ns.stock.getBidPrice(sym) * shares;
					bought--;
					await ns.sleep(1000);
					ns.exit();
				}
				await ns.sleep(6000);
			}
		}
		gains(ns, pricebought, pricesold);
	}
}

function log(ns, sym) {
	ns.print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
	ns.print("Forecast for ", sym, ": ", (ns.stock.getForecast(sym)).toFixed(2));
	ns.print("Price of ", sym, ": ", ns.stock.getPrice(sym));
}

function gains(ns, pricebought, pricesold) {
	let net = pricesold - pricebought;
	let prev = ns.read("stockgains.js");
	let total = prev + net;
	ns.write("stockgains.js", total, "w");
}
// round forecast to 1 decimal
// shorten forecast message to *sym*: *number*
// remove previous messages by adding a bunch of \n
// add a price change message