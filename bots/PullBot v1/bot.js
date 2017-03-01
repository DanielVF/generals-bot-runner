module.exports = function(){
    this.name = "Pullbot"
    this.description = "Randomly moves closer to the battle."
    this.version = 1
    
    this.doStep = function(map, playerIndex){

        
        // First, try taking a neigboring square
        for(var i = 0; i<= map.size; i++ ){
            if(map.owners[i] != playerIndex) { continue; }
            if(map.strengths[i] <=1 ) { continue; }
            var neighbors = this.neighbors(map, i)
            var myStrength = map.strengths[i]
            for(var ni = 0; ni < neighbors.length; ni++ ){
                var neighbor = neighbors[ni]
                if(map.owners[neighbor] != playerIndex && myStrength > map.strengths[neighbor] + 1){
                    return [i, neighbor]
                }
            }
        }
        
        // Make a map of the distance to the front lines
        var distanceToFront = Array(map.size)
        var openSquares = [] 
        var openi = 0
        for(var i = 0; i<= map.size; i++ ){
            if(map.owners[i] != playerIndex) {
                distanceToFront[i] = 0 
                continue;
            }
            neighbors = this.neighbors(map, i)
            for(ni = 0; ni < neighbors.length; ni++ ){
                neighbor = neighbors[ni]
                if(map.owners[neighbor] != playerIndex && (map.terrain[neighbor] == 0 || map.terrain[neighbor] == 2) ){
                    openSquares.push(i)
                    distanceToFront[i] = 1
                }
            }
        }
        while(openi < openSquares.length){
            var i = openSquares[openi]
            neighbors = this.neighbors(map, i)
            for(ni = 0; ni < neighbors.length; ni++ ){
                neighbor = neighbors[ni]
                if(map.owners[neighbor] == playerIndex && distanceToFront[neighbor] == undefined ){
                    openSquares.push(neighbor)
                    distanceToFront[neighbor] = distanceToFront[i] + 1
                }
            }
            openi++
        }
        
        
        
        // Find a square of mine with more than one strength on it
        var sources = [];
        for(var i = 0; i<= map.size; i++ ){
            if(map.owners[i] != playerIndex) { continue; }
            if(map.strengths[i] <=1 ) { continue; }
            sources.push(i)
        }
        if(sources.length == 0){ return; }
        var source = sources[Math.floor(Math.random() * sources.length)]

        
        // Move towards the front line
        var neighbors = this.neighbors(map, source)
        var bestDist = 99999 
        var dest = -1;
        for(var ni = 0; ni < neighbors.length; ni++ ){
            var neighbor = neighbors[ni]
            if(distanceToFront[neighbor] >= bestDist){ continue; }
            if(map.terrain[neighbor] == 1 && map.owners[neighbor] != playerIndex){ continue; }
            bestDist = distanceToFront[neighbor]
            dest = neighbor
        }
        
        if(dest == -1){
            return
        }
        
        return [source, dest, false]
    }
    
    this.neighbors = function(map, index){
        neighbors = []
        var x = index % map.width
        var y = Math.floor(index / map.width)
        if(y > 0 && map.terrain[index - map.width] != -1){
            neighbors.push(index - map.width)
        }
        if(x > 0 && map.terrain[index - 1] != -1){
            neighbors.push(index - 1)
        }
        if(y < map.height - 1 && map.terrain[index + map.width] != -1){
            neighbors.push(index + map.width)
        }
        if(x < map.width - 1 && map.terrain[index + 1] != -1){
            neighbors.push(index + 1)
        }
        return neighbors
    }
}