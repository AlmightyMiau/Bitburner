/** @param {NS} ns */
export async function main(ns) {
	const symbol = ns.args[0];
	const target = ns.args[1];
	let manip = ns.args[2];
	let debug = ns.args[3];
	let pricebought;
	let pricesold;
	debug = true;
	
	const maxmoney = 0;
	if (symbol === undefined) {
		ns.print("arg 0 is the stock symbol");
		ns.exit();
	} else if (symbol == "--help" || symbol == "help" || symbol == "-h") {
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
	let shares = ns.stock.getMaxShares(symbol);
	//const minprice = ns.stock.
	ns.disableLog("sleep");

	if (manip == true) {
		while (true) {
			// Hack foodnstuff to bring price down
			if (ns.getServerMoneyAvailable(target) != 0) {
				ns.print("bringing price down.");
				while (ns.getServerMoneyAvailable(target) != 0) {
					ns.exec("misc/run.js", "home", 1, target, "start/temphack.js");
					await ns.sleep(5000);
				}
			}
			// after price is down, buy max stock
			// homemade place order command
			if (ns.stock.getAskPrice(symbol) > buyprice) {
				ns.print("Waiting for price to drop");
				while (ns.stock.getAskPrice(symbol) > buyprice) {
					ns.print(Floor(ns.stock.getAskPrice(symbol)));
					await ns.sleep(60000);
					if (ns.stock.getAskPrice(symbol) < minprice) {
						minprice = ns.stock.getAskPrice(symbol);
						ns.write("minprice.txt", minprice, "w");
					} else if (ns.stock.getBidPrice(symbol) > maxprice) {
						maxprice = ns.stock.getBidPrice(symbol);
						ns.write("maxprice.txt", maxprice, "w");
					}
				}
			}
			ns.stock.buyStock(symbol, shares);
			// after bought, raise price with grow
			if (ns.getServerMoneyAvailable(target) < maxmoney) {
				ns.print("bringing price up.");
				while (ns.getServerMoneyAvailable(target) < maxmoney) {
					ns.exec("misc/run.js", "home", 1, target, "start/tempgrow.js");
					await ns.sleep(5000);
				}
			}
			// after raising price, sell all stock
			if (ns.stock.getBidPrice(symbol) < sellprice) {
				ns.print("Waiting for price to increase");
				while (ns.stock.getBidPrice(symbol) < sellprice) {
					ns.print(Floor(ns.stock.getBidPrice(symbol)));
					await ns.sleep(60000);
					if (ns.stock.getBidPrice(symbol) > maxprice) {
						maxprice = ns.stock.getBidPrice(symbol);
						ns.write("maxprice.txt", maxprice, "w");
					} else if (ns.stock.getAskPrice(symbol) < minprice) {
						minprice = ns.stock.getAskPrice(symbol);
						ns.write("minprice.txt", minprice, "w");
					}
				}
			}
			ns.stock.sellStock(symbol, shares);
			//repeat after 10 seconds
			await ns.sleep(10000);
		}
	} else {
		let bought = 0;
		if (bought == 0) {

			if (debug) {log(ns, symbol);}
			while (bought == 0) {
				// if price is going up
				if (debug) {ns.print("Forecast for ", symbol, ": ", (ns.stock.getForecast(symbol)).toFixed(2));}
				if (ns.stock.getForecast(symbol) > 0.5) {
					ns.stock.buyStock(symbol, shares);
					pricebought = ns.stock.getAskPrice(symbol) * shares;
					bought++;
					break;
				}
				await ns.sleep(6000);
			}
		} if (bought == 1) {
			if (debug) {ns.print("Waiting for forecast to show going down.");}
			while (bought == 1) {
				// log window messages
				if (debug) {log(ns, symbol);}
				if (ns.stock.getForecast(symbol) < 0.5) {
					ns.stock.sellStock(symbol, shares);
					pricesold = ns.stock.getBidPrice(symbol) * shares;
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

function log(ns, symbol) {
	ns.print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
	ns.print("Forecast for ", symbol, ": ", (ns.stock.getForecast(symbol)).toFixed(2));
	ns.print("Price of ", symbol, ": ", ns.stock.getPrice(symbol));
}

function gains(ns, pricebought, pricesold) {
	let net = pricesold - pricebought;
	let prev = ns.read("stockgains.js");
	let total = prev + net;
	ns.write("stockgains.js", total, "w");
}
// round forecast to 1 decimal
// shorten forecast message to *symbol*: *number*
// remove previous messages by adding a bunch of \n
// add a price change message
