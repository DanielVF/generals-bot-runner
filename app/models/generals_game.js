function GeneralsGame(){
    
}

GeneralsGame.prototype.generateMap = function(width, height, playerCount){
    var size = width * height;
    var strengths = Array(size)
    var owners = Array(size)
    var terrain = Array(size)
    var rows = Array(height)
    
    // Create Random Units
    for(var i = 0; i<size; i++){
        strengths[i] = Math.floor(Math.random()*Math.random() * 10.0 + 1)
        owners[i] = Math.floor(Math.random() * 4) - 1
        if(owners[i] == -1){
            strengths[i] = 0;
        }
    }
    
    // Add Mountains
    for(var i = 0; i<size; i++){
        if(Math.random() > 0.2){ continue }
        strengths[i] = 0
        owners[i] = -1
        terrain[i] = -1
    }
    
    // Add Cities
    for(var i = 0; i<size; i++){
        if(Math.random() > 0.06){ continue }
        strengths[i] = 40 + Math.floor(Math.random()*10)
        owners[i] = -1
        terrain[i] = 1
    }
    
    // Add Generals
    for(var playerIndex = 0; playerIndex<playerCount; playerIndex++){
        i = Math.floor(Math.random()*size)
        strengths[i] = 2
        owners[i] = playerIndex
        terrain[i] = 2
    }
    
    // Precomputed Rows
    for(var y = 0; y < height; y++){
        rows[y] = Array(width)
        for(var x = 0; x < width; x++){
            rows[y][x] = y * width + x
        }
    }
    
    return {
        width: width,
        height: height,
        size: size,
        strengths: strengths,
        owners: owners,
        terrain: terrain,
        rows: rows,
        step: 0
    }
}

GeneralsGame.prototype.doStep = function(map, moves){

    // Handle moves first
    for(var playerIndex = 0; playerIndex < moves.length; playerIndex++){
        var move = moves[playerIndex]
        if(move == null){ continue; }
        var source = move[0]
        var destination = move[1]
        if(playerIndex != map.owners[source]){ continue; } // Source must belong to moveing player
        if(map.strengths[source] <= 1 ){ continue; } // Source must have at least two strength to move
        if(map.terrain[destination] == -1 ){ continue; } // Destination must not be a mountain
        var moveStrength = map.strengths[source] - 1
        map.strengths[source] = 1
        
        if(map.owners[destination] == playerIndex){
            // Friendly move
            map.strengths[destination] += moveStrength
        }else{
            // Attack
            map.strengths[destination] -= moveStrength
            if(map.strengths[destination] < 0){
                map.strengths[destination] *= -1
                if(map.terrain[destination] == 2 ){
                    // General capture - convert to city
                    map.terrain[destination] = 1
                    // General capture - give ownership of all squares
                    var loser = map.owners[destination]
                    for(var i = 0; i<map.size; i++){
                        if(map.owners[i]==loser){
                            map.owners[i] = playerIndex;
                        }
                    }
                }else{
                    map.owners[destination] = playerIndex
                }
                
            }
        }
    }
        
    map.step += 1
    
    // Farm owned tiles
    if(map.step % 50 === 0){
        for(var i = 0; i<map.size; i++){
            if(map.owners[i]>=0){
                map.strengths[i] += 1;
            }
        }
    }
    
    // Grow cities and generals
    if(map.step % 2 === 0){
        for(var i = 0; i<map.size; i++){
            if(map.terrain[i] != 1 && map.terrain[i] != 2 ){ continue }
            if(map.owners[i]>=0 || map.strengths[i] < 40){
                map.strengths[i] += 1;
            }
        }
    }
    
    return map
}

module.exports = GeneralsGame