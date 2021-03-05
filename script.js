//Class #1 KPop Band
class Band {
    //A KPop Band will have a name, singers, and songs associated with it
    constructor(name) {
        this.name = name; 
        this.singers = []; 
        this.songs = []; 
    }

    //Add a singer to the band
    addSinger(singer) {
        if (singer instanceof Singer) {
            this.singers.push(singer); 
        } else {
            throw new Error(`You can only add an instance of a Singer. 
            Arument is not a singer: ${singer}`); 
        }
    }

    //Add a song to the band
    addSong(song) {
        if (song instanceof Song) {
            this.songs.push(song); 
        } else {
            throw new Error(`You an only add an instance of a Song.
            Argument is not a song: ${song}`); 
        }
    }
    
    describe() {
        return `${this.name} has ${this.singers.length} singers 
        and ${this.songs.length} songs`
    }

}

//#2 Class is Singer
class Singer {
    constructor(name, position) {
        this.name = name; 
        this.position=position; 
    }

    describe() {
        return `${this.name} is the ${this.position}.`; 
    }

}

//#3 Class is songs
class Song {
    constructor(name) {
        this.name = name; 
    }

    describe() {
        return `${this.name}.`; 
    }

}

//Menu Class
class Menu {
    constructor() {
        this.bands = []; 
        this.selectedBand= null; 
    }

    start() {
        let selection = this.showMainMenuOptions(); 
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createBand();   //Create a band (Step 1)
                    break; 
                case '2':
                    this.viewBandsSingers(); //View, Create, and Delete Singers from a Band
                    break; 
                case '3':
                    this.viewBandsSongs(); //View, Create, and Delete Songs from a band
                    break; 
                case '4':
                    this.deleteBand(); //Delete a band
                    break; 
                case '5':
                    this.displayAllBands(); //Display all bands (must be created first)
                    break; 
                default:
                    selection = 0;  
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!'); 
    }

    showMainMenuOptions() {   //Main prompt that pops up first
        return prompt(`
        0) Exit App
        1) Create new KPop Band
        2) View KPop Band's singers 
        3) View Kpop Band's songs 
        4) Delete a KPop Band
        5) Display all KPop Bands
        `); 
    }

    showBandsSingersMenu(bandInfo) {  //Menu prompt when adding/deleting singers
        return prompt(`
        0) back
        1) Create singer 
        2) Delete singer
        -------------------
        ${bandInfo}
        `);
    }

    showBandsSongsMenu(bandInfo) { //Menu promp when adding/deleting songs 
        return prompt(`
        0) back
        1) Create song
        2) Delete song
        -------------------
        ${bandInfo}
        `);
    }

    displayAllBands() {  //Menu option #5
        let bandString = ''; 
        for (let i = 0; i < this.bands.length; i++) {
            bandString += i + ')' + this.bands[i].name + '\n'; 
        }
        alert(bandString); 
    }
   
    createBand() { //Menu option #1
        let name = prompt("Enter the KPop's Band Name:"); 
        this.bands.push(new Band(name)); 
    }

    viewBandsSingers() {  //Menu option #2
        let index = prompt('Enter the index of the band you wish to view:'); 
        //Loop thru the bands so user can pick the band they want to see
        if (index > -1 && index < this.bands.length) {
            this.selectedBand = this.bands[index]; 
            let description = 'KPop Band Name:' + this.selectedBand.name + '\n'; 
            //Loop thru the singers of each band 
            for (let i = 0; i < this.selectedBand.singers.length; i++) {
                description += i + ')' + this.selectedBand.singers[i].name + '-' +
                this.selectedBand.singers[i].position + '\n'; 
            }
            //Menu to create/delete a singer 
            let selection = this.showBandsSingersMenu(description); 
            switch (selection) {
                case '1':
                    this.createSinger(); 
                    break; 
                case '2':
                    this.deleteSinger(); 
            }
        }
    }

    viewBandsSongs() {  //Menu option #3
        let index = prompt('Enter the index of the band you wish to view:'); 
        //Loop thru all the bands
        if (index > -1 && index < this.bands.length) {
            this.selectedBand = this.bands[index]; 
            let description = 'KPop Band Name:' + this.selectedBand.name + '\n'; 
            //Loop thru all the songs in each band
            for (let i = 0; i < this.selectedBand.songs.length; i++) {
                description += i + ')' + this.selectedBand.songs[i].name + '\n'; 
            }
            //Menu to create/delete a song
            let selection = this.showBandsSongsMenu(description); 
            switch (selection) {
                case '1':
                    this.createSong(); 
                    break; 
                case '2':
                    this.deleteSong(); 
            }
        }
    }

    deleteBand() { //Menu option #4
        let index = prompt('Enter the index of KPop Band you wish to delete:'); 
        if (index > -1 && index < this.bands.length) {
            this.bands.splice(index, 1); 
        }
    }

    createSinger() {  //Method in viewBandsSingers
        let name = prompt('Enter name for new singer: '); 
        let position = prompt('Enter position for new singer: '); 
        this.selectedBand.singers.push(new Singer(name, position)); 
    }

    deleteSinger() { //Method in viewBandsSingers
        let index = prompt('Enter the index of the singer you with to delete:'); 
        if (index > -1 && index < this.selectedBand.singers.length) {
            this.selectedBand.singers.splice(index, 1); 
        }
    }

    createSong() { //Method in viewBandsSongs
        let name = prompt('Enter name for new song:');  
        this.selectedBand.songs.push(new Song(name)); 
    }

    deleteSong() { //Method in viewBandsSongs
        let index = prompt('Enter the index of the song you with to delete:'); 
        if (index > -1 && index < this.selectedBand.songs.length) {
            this.selectedBand.songs.splice(index, 1); 
        }
    }


}

//Starting the menu 
let menu =  new Menu(); 
menu.start(); 
