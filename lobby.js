const players = []

function addNewPlayer(player) { 
    if (!checkPlayerExist(player)){
        players.push(player)
    }
}

function checkPlayerExist(player) {
    players.forEach(element => {
        if (player.id == element.id) {
            return true
        }
    }) 
    return false
}