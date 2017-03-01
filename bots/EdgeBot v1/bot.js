module.exports = function(){
    this.name = "Edgebot"
    this.description = "Attacks neighboring squares it can take."
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
        
        
        
        // Find a square of mine with more than one strength on it
        var sources = [];
        for(var i = 0; i<= map.size; i++ ){
            if(map.owners[i] != playerIndex) { continue; }
            if(map.strengths[i] <=1 ) { continue; }
            sources.push(i)
        }
        if(sources.length == 0){ return; }
        var source = sources[Math.floor(Math.random() * sources.length)]
        
        // Make a random move from this
        var width = map.width
        var height = map.height
        var row = Math.floor(source / width);
		var col = source % width;
		var endIndex = source;

		var rand = Math.random();
		if (rand < 0.25 && col > 0) { // left
			endIndex--;
		} else if (rand < 0.5 && col < width - 1) { // right
			endIndex++;
		} else if (rand < 0.75 && row < height - 1) { // down
			endIndex += width;
		} else if (row > 0) { //up
			endIndex -= width;
		} else {
			return;
		}
        
        var dest = endIndex
        
        
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