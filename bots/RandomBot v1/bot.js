module.exports = function(){
    this.name = "RandomBot"
    this.description = "Makes random moves"
    this.version = 1
    
    this.doStep = function(map, playerIndex){
        var sources = [];
        // Find a square of mine with more than one strength on it
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
}