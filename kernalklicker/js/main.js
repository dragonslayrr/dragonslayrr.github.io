let UpgradeList = [];
let PowerUpList = [];

class Timer {
    constructor(Function, Duration) {
        this.Timer = setTimeout(() => {
            Function();
            clearInterval(this.Update);
            this.CurrentTime = 0;
            this.EndTime = 0;
        }, Duration);
        this.EndTime = new Date().getTime() + Duration;
        this.CurrentTime = 0;
        this.Update = setInterval(() => {
            this.CurrentTime = this.EndTime - new Date().getTime();
        }, 0);
    }
    GetTime() {
        var minutes = Math.floor(this.CurrentTime / 60000);
        var seconds = ((this.CurrentTime % 60000) / 1000).toFixed(0);
        if (seconds < 10) {
            return minutes + ":" + (this.CurrentTime < 10 ? "0" : "0") + seconds;
        } else {
            return minutes + ":" + (this.CurrentTime < 10 ? "0" : "") + seconds;
        }
    }
}

class Upgrade {
    constructor() {
        this.handleClick = () => {};
        this.CanBuy = false;
        this.UpgradeName = "";
        this.UpgradeImage = "";
        this.UpgradeTier = 1;
        this.Upgradekerency = [0];
        this.MaxUpgradeTier = 11;
        this.Upgrade = {};
        this.Interval = setInterval(() => {
            this.Update();
        }, 0);
        UpgradeList.push(this);
    }
    Click = () => {
        if (!this.CanBuy) {
            alert("Can't afford");
            return;
        } else {
            kerency -= this.Upgradekerency[this.UpgradeTier - 1];
            this.Upgraded();
        }
        if (this.UpgradeTier < this.MaxUpgradeTier) {
            this.UpgradeTier += 1;
        }
        if (this.UpgradeTier == this.MaxUpgradeTier) {
            this.CanBuy = false;
        }

        this.handleClick();
    };

    Upgraded() {}
    Update() {
        if (kerency >= this.Upgradekerency[this.UpgradeTier - 1]) {
            this.CanBuy = true;
        } else {
            this.CanBuy = false;
        }
        if (this.CanBuy == true) {
            this.Div.classList.add("CanBuy");
        } else {
            this.Div.classList.remove("CanBuy");
        }

        if (this.UpgradeTier - 1 > 0 && this.UpgradeName == "Microwave") {
            this.Img.setAttribute("src", "./Assets/boltUpgrade.png");
        }

        this.PriceText.innerText = `$${this.Upgradekerency[this.UpgradeTier - 1]}`;
        if (this.UpgradeTier < 11) {
            this.TierText.innerText = `Tier: ${this.UpgradeTier}`;
        } else {
            this.TierText.innerText = `Max Tier`;
        }
    }
}

class microwave extends Upgrade {
    constructor() {
        super(Upgrade);
        this.UpgradeName = "Microwave";
        this.UpgradeImage = "./Assets/microwave.png";
        this.Upgradekerency = [15, 50, 100, 150, 200, 250, 300, 350, 400, 500, Infinity];
        this.Upgrade = [
            { Speed: 10 * 1000, Damage: 1 },
            { Speed: 9 * 1000, Damage: 1 },
            { Speed: 8 * 1000, Damage: 2 },
            { Speed: 7 * 1000, Damage: 2 },
            { Speed: 6 * 1000, Damage: 3 },
            { Speed: 5 * 1000, Damage: 3 },
            { Speed: 4 * 1000, Damage: 4 },
            { Speed: 3 * 1000, Damage: 4 },
            { Speed: 2 * 1000, Damage: 5 },
            { Speed: 1000, Damage: 5 },
            { Speed: 1, Damage: 100 },
            { Speed: 1, Damage: 100 },
        ];
    }
    Upgraded() {
        clearInterval(this.AutoClickInterval);
        this.AutoClickInterval = setInterval(() => {
            this.AutoClick();
        }, this.Upgrade[this.UpgradeTier - 1].Speed);
    }
    AutoClick() {
        enemy.hp -= this.Upgrade[this.UpgradeTier - 1].Damage;
        enemy.HandleClick(null);
    }
}
class force extends Upgrade {
    constructor() {
        super(Upgrade);
        this.UpgradeName = "Force";
        this.UpgradeImage = "./Assets/butterPower.png";
        this.Upgradekerency = [15, 50, 100, 150, 200, 250, 300, 350, 400, 500, Infinity];
        this.Upgrade = [{ Damage: 2 }, { Damage: 4 }, { Damage: 6 }, { Damage: 8 }, { Damage: 10 }, { Damage: 12 }, { Damage: 14 }, { Damage: 18 }, { Damage: 20 }, { Damage: 22 }, { Damage: 100 }];
    }
    Upgraded() {
        damage = this.Upgrade[this.UpgradeTier - 1].Damage;
    }
}

class powerUp {
    constructor() {
        this.activatePowerup = () => {};
        this.deactivatePowerup = () => {};
        this.UpgradeName = "";
        this.UpgradeImage = "";
        this.Upgradekerency = 0;
        this.purchased = false;
        this.cooldown = 0;
        this.duration = 0;
        this.cooldownTimeout = null;
        this.durationTimeout = null;
        this.active = false;
        this.ready = true;
        this.default = {};
        this.powerUp = {};
        this.main = null;

        this.handleUpdate = () => {};

        this.handleClick = () => {};

        this.Interval = setInterval(() => {
            this.Update();
            this.handleUpdate();
        }, 0);
        PowerUpList.push(this);
    }

    handleCooldown() {
        this.ready = true;
        this.Countdown.innerText = "Ready";
    }

    handleDuration() {
        this.active = false;
        this.ready = false;
        this.deactivatePowerup();
        this.cooldownTimeout = new Timer(() => {
            this.handleCooldown();
        }, this.cooldown);
    }

    Update() {
        if (this.active) {
            this.activatePowerup();
            if (this.durationTimeout != null) {
                this.Countdown.innerText = this.durationTimeout.GetTime();
            }
        } else {
            if (this.cooldownTimeout != null && !this.ready) {
                this.Countdown.innerText = this.cooldownTimeout.GetTime();
            }
        }
    }

    Click = () => {
        if (this.ready && !this.active && this.purchased) {
            this.active = true;
            this.handleClick();
            this.durationTimeout = new Timer(() => {
                this.handleDuration();
            }, this.duration);
        }
    };
}

class butterBoom extends powerUp {
    constructor() {
        super(powerUp);
        this.UpgradeName = "Butter Boom";
        this.UpgradeImage = "./Assets/butterBoom.png";
        this.Upgradekerency = 0;
        this.purchased = false;
        this.cooldown = 10 * 1000;
        this.duration = 10 * 1000;
        this.active = false;
        this.strength = 1.5;
        this.powerUp = { Kerency: enemy.kerency * this.strength };
        this.main = new Upgrade();

        console.log(this.main.UpgradeTier - 1);
        this.main.UpgradeName = this.UpgradeName;
        this.main.UpgradeImage = this.UpgradeImage;
        this.main.Upgradekerency = [25, 100, 300, 500];
        this.main.MaxUpgradeTier = 4;
        this.main.Upgrade = [
            { Strength: 1, Duration: 0 },
            { Strength: 1.5, Duration: 10000 },
            { Strength: 2, Duration: 30000 },
            { Strength: 3, Duration: 30000 },
        ];
        this.main.handleClick = () => {
            if (this.main.UpgradeTier != 0) {
                this.purchased = true;
                console.log(this.main.UpgradeTier - 1);
                this.duration = this.main.Upgrade[this.main.UpgradeTier - 1].Duration;
                this.strength = this.main.Upgrade[this.main.UpgradeTier - 1].Strength;
            }
        };
        this.activatePowerup = () => {
            this.powerUp = { Kerency: enemy.defaultKerency * this.strength };
            enemy.kerency = Math.floor(this.powerUp.Kerency);
        };
        this.deactivatePowerup = () => {
            enemy.kerency = enemy.defaultKerency;
        };
    }
}

class supercharger extends powerUp {
    constructor() {
        super(powerUp);
        this.UpgradeName = "Supercharger";
        this.UpgradeImage = "./Assets/bolt.png";
        this.Upgradekerency = 0;
        this.purchased = false;
        this.cooldown = 10 * 1000;
        this.duration = 10 * 1000;
        this.active = false;
        this.DamageMult = 1;
        this.SpeedMult = 1;
        this.powerUp = { DamageMult: 2, SpeedMult: 2 };
        this.main = new Upgrade();

        console.log(this.main.UpgradeTier - 1);
        this.main.UpgradeName = this.UpgradeName;
        this.main.UpgradeImage = this.UpgradeImage;
        this.main.Upgradekerency = [25, 100, 300, 500];
        this.main.MaxUpgradeTier = 4;
        this.main.Upgrade = [
            { DamageMult: 1, SpeedMult: 1, Duration: 0 },
            { DamageMult: 2, SpeedMult: 2, Duration: 20000 },
            { DamageMult: 3, SpeedMult: 2, Duration: 30000 },
            { DamageMult: 3, SpeedMult: 2, Duration: 60000 },
        ];
        this.main.handleClick = () => {
            if (this.main.UpgradeTier != 0) {
                this.purchased = true;
                console.log(this.main.UpgradeTier - 1);
                this.duration = this.main.Upgrade[this.main.UpgradeTier - 1].Duration;
                this.DamageMult = this.main.Upgrade[this.main.UpgradeTier - 1].DamageMult;
                this.SpeedMult = this.main.Upgrade[this.main.UpgradeTier - 1].SpeedMult;
            }
        };

        this.handleClick = () => {
            UpgradeList.forEach((upgrade) => {
                if (upgrade.UpgradeName == "Microwave") {
                    clearInterval(upgrade.AutoClickInterval);
                    upgrade.AutoClickInterval = setInterval(() => {
                        enemy.hp -= upgrade.Upgrade[upgrade.UpgradeTier - 1].Damage * this.DamageMult;
                        enemy.HandleClick(null);
                    }, upgrade.Upgrade[upgrade.UpgradeTier - 1].Speed / this.SpeedMult);
                }
            });
        };

        this.activatePowerup = () => {};

        this.deactivatePowerup = () => {
            UpgradeList.forEach((upgrade) => {
                if (upgrade.UpgradeName == "Microwave") {
                    clearInterval(upgrade.AutoClickInterval);
                    upgrade.AutoClickInterval = setInterval(() => {
                        upgrade.AutoClick();
                    }, upgrade.Upgrade[upgrade.UpgradeTier - 1].Speed);
                }
            });
        };
    }
}

// force voltage current
class kernal {
    constructor() {
        this.Active = true;
        this.type = "";
        this.hp = 0;
        this.maxHp = 0;
        this.kerency = 0;
        this.defaultKerency = 0;

        this.target = document.getElementById("clickableThing");
        this.healthBar = document.getElementById("healthBar");
        this.healthLabel = document.getElementById("healthLabel");
        this.nameTag = document.getElementById("nameTag");
        this.healthBar.value = this.hp;
        this.healthBar.max = this.maxHp;
        this.addEventListener = this.target.addEventListener("click", this.HandleClick);
        this.Interval = setInterval(() => {
            this.Update();
        }, 0);
    }
    HandleClick = (e) => {
        if (this.Active == true) {
            if (e != null) {
                this.hp -= damage;
            }
            if (this.hp <= 0) {
                this.Active = false;
                kerency += this.kerency;
                if (this.type == "basic") {
                    basicKills++;
                    basicKillsStats++;
                }
                if (this.type == "advanced") {
                    advKills++;
                    advKillStats++;
                }
                if (this.type == "colonel") {
                    colonelKills++;
                }
                this.target.removeEventListener("click", this.addEventListener, true);
                clearInterval(this.Interval);

                // setTimeout(spawnEnemy, 500);
                spawnEnemy();
            }
        }
    };
    Update() {
        this.healthLabel.innerHTML = `${this.hp}/${this.maxHp}`;
        this.nameTag.innerHTML = this.type.charAt(0).toUpperCase() + this.type.slice(1, this.type.length);

        this.healthBar.max = this.maxHp;
        this.healthBar.value = this.hp;

        if (this.hp <= 0) {
            this.healthBar.value = 0;
        }

        if (this.hp <= Math.floor(this.maxHp / 2) && this.hp != 0) {
            this.target.style.backgroundImage = 'URL("./Assets/kerncorn.png")';
        }

        if (this.hp == 1) {
            this.target.style.backgroundImage = 'URL("./Assets/popcorn.png")';
        }
    }
}

class basicKernal extends kernal {
    constructor() {
        super(kernal);
        this.hp = 10;
        this.maxHp = 10;
        this.kerency = 2;
        this.type = "basic";
        this.defaultKerency = this.kerency;
    }
}

class advancedKernal extends kernal {
    constructor() {
        super(kernal);
        this.hp = 25;
        this.maxHp = 25;
        this.kerency = 5;
        this.type = "advanced";
        this.defaultKerency = this.kerency;
    }
}

class colonelKernal extends kernal {
    constructor() {
        super(kernal);
        this.hp = 50;
        this.maxHp = 50;
        this.kerency = 10;
        this.type = "colonel";
        this.defaultKerency = this.kerency;
    }
}
function truncateDecimals(num, precision) {
    const factor = Math.pow(10, precision);
    const truncatedNum = Math.trunc(num * factor) / factor;
    return truncatedNum.toString();
}

function formatNumber(num) {
    const suffixes = ["", "k", "m", "b", "t", "q", "Q", "s", "S", "o", "n"];
    const threshold = 1000;
    for (let i = suffixes.length - 1; i > 0; i--) {
        const divideBy = Math.pow(threshold, i);
        if (Math.abs(num) >= divideBy) {
            return truncateDecimals(Math.sign(num) * (Math.abs(num) / divideBy), 1) + suffixes[i];
        }
    }

    return num;
}
let basicKills = 0;
let basicKillsStats = 0;
let advKills = 0;
let advKillStats = 0;
let colonelKills = 0;
let damage = 1;
let kerency = 0;

const basicTrack = document.getElementById("basicTrack");
const advTrack = document.getElementById("advTrack");
const colonolTrack = document.getElementById("colonolTrack");
const totalTrack = document.getElementById("totalTrack");

let infAchieved = false;

const UpgradeButton = document.getElementById("UpgradeButton");
const UpgradeArea = document.getElementById("upgradeArea");
let UpgradeMenu = false;
//50,250px
UpgradeButton.addEventListener("click", () => {
    UpgradeMenu = !UpgradeMenu;
    if (UpgradeMenu) {
        UpgradeArea.style.height = 250 + "px";
    } else {
        UpgradeArea.style.height = 35.2 + "px";
    }
});
function spawnEnemy() {
    //   num = Math.floor(Math.random() * enemyArray.length);
    if (basicKills == 10) {
        basicKills = 0;
        enemy = undefined;
        enemy = new advancedKernal();
    } else if (advKills == 10) {
        advKills = 0;
        enemy = undefined;
        enemy = new colonelKernal();
    } else {
        enemy = undefined;
        enemy = new basicKernal();
    }

    enemy.target.style.backgroundImage = 'URL("./Assets/kernal.png")';
}

function checkStats() {
    alert(`
    Basic Kills: ${basicKillsStats}
    Advanced Kills: ${advKillStats}
    Colonol Kills: ${colonelKills}`);
}

MenuButton = document.getElementById("menuButton");
pauseMenuActive = false;
pauseMenu = document.getElementById("menuArea");
menuArea = document.getElementById("menu");
MenuButton.addEventListener("click", () => {
    pauseMenuActive = !pauseMenuActive;
    if (pauseMenuActive) {
        pauseMenu.style.width = 150 + "px";
        menuArea.style.opacity = 1;
    } else {
        pauseMenu.style.width = 0 + "px";
        menuArea.style.opacity = 0;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "PageUp") {
        damage = parseInt(prompt("Damage? "));
    }
    if (e.key == "PageDown") {
        kerency = parseInt(prompt("Kerency? "));
    }
    if (e.key == "Escape") {
        pauseMenuActive = !pauseMenuActive;
        if (pauseMenuActive) {
            pauseMenu.style.width = 150 + "px";
            menuArea.style.opacity = 1;
        } else {
            pauseMenu.style.width = 0 + "px";
            menuArea.style.opacity = 0;
        }
    }
    if (e.key == " ") {
        UpgradeMenu = !UpgradeMenu;
        if (UpgradeMenu) {
            UpgradeArea.style.height = 250 + "px";
        } else {
            UpgradeArea.style.height = 35.2 + "px";
        }
    }
});

spawnEnemy();

new microwave();
new force();
new butterBoom();
new supercharger();
UpgradesParent = document.getElementById("Upgrades");
UpgradeList.forEach((Upgrades) => {
    Upgrades.Div = document.createElement("div");
    Upgrades.Img = document.createElement("img");
    Upgrades.PriceText = document.createElement("h1");
    Upgrades.TierText = document.createElement("h1");

    Upgrades.PriceText.innerText = Upgrades.Upgradekerency[Upgrades.UpgradeTier];
    Upgrades.TierText.innerText = Upgrades.UpgradeTier;
    Upgrades.Img.setAttribute("src", Upgrades.UpgradeImage);
    Upgrades.Img.setAttribute("draggable", "false");
    Upgrades.Img.setAttribute("id", Upgrades.UpgradeName + "Img");
    Upgrades.Div.setAttribute("id", Upgrades.UpgradeName);
    Upgrades.PriceText.setAttribute("id", Upgrades.UpgradeName + "PriceText");
    Upgrades.TierText.setAttribute("id", Upgrades.UpgradeName + "TierText");

    Upgrades.Img.classList.add("UpgradeImg");
    Upgrades.Div.classList.add("Upgrade");
    Upgrades.PriceText.classList.add("UpgradePriceText");
    Upgrades.TierText.classList.add("UpgradeTierText");

    Upgrades.Div.appendChild(Upgrades.Img);
    Upgrades.Div.appendChild(Upgrades.PriceText);
    Upgrades.Div.appendChild(Upgrades.TierText);
    UpgradesParent.appendChild(Upgrades.Div);
    Upgrades.Div.addEventListener("click", Upgrades.Click);
});

PowerUpParent = document.getElementById("PowerUps");
PowerUpList.forEach((PowerUps) => {
    PowerUps.Div = document.createElement("div");
    PowerUps.Img = document.createElement("img");
    PowerUps.Countdown = document.createElement("h1");

    PowerUps.Countdown.innerText = "Ready";
    PowerUps.Img.setAttribute("src", PowerUps.UpgradeImage);
    PowerUps.Img.setAttribute("draggable", "false");
    PowerUps.Img.setAttribute("id", "PowerUp" + PowerUps.UpgradeName + "Img");
    PowerUps.Div.setAttribute("id", "PowerUp" + PowerUps.UpgradeName);
    PowerUps.Countdown.setAttribute("id", "PowerUp" + PowerUps.UpgradeName + "Countdown");

    PowerUps.Img.classList.add("PowerUpImg");
    PowerUps.Div.classList.add("PowerUp");
    PowerUps.Countdown.classList.add("PowerUpCountdown");

    PowerUps.Div.appendChild(PowerUps.Img);
    PowerUps.Div.appendChild(PowerUps.Countdown);
    PowerUpParent.appendChild(PowerUps.Div);
    PowerUps.Div.addEventListener("click", PowerUps.Click);
});

kerencyText = document.getElementById("Kerency");
// Terraria buffs for upgrades
function Update() {
    basicTrack.innerHTML = `Basic Pops: ${basicKillsStats}`;
    advTrack.innerHTML = `Advanced Pops: ${advKillStats}`;
    colonolTrack.innerHTML = `Colonol Pops: ${colonelKills}`;
    totalTrack.innerHTML = `Total Pops: ${basicKillsStats + advKillStats + colonelKills}`;

    if (kerency == Infinity && !infAchieved) {
        infAchieved = true;
        enemy.target.style.animation = "rgb 5000ms infinite linear";
    }

    if (kerency.toString() == "NaN") {
        kerency = 0;
    }
    kerencyText.innerHTML = formatNumber(kerency) + " Kerency";
}
setInterval(() => {
    Update();
}, 0);
