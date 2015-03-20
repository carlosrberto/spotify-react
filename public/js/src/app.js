var ArtistList = React.createClass({
    render: function(){
        var items = this.props.artists.map(function(item, i) {
            return (
                <li key={item.name}>
                    <img src={item.image ? item.image.url : ''} height="180" />
                    <p>{item.name}</p>
                </li>
            )
        }.bind(this));
        return (
            <ul className="artist-list">
                {items}
            </ul>
        );
    }
});

var SimilarArtists = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            artists: []
        }
    },

    search: function(event) {
        if (event.keyCode === 13) {
            this.setState({
                loading: true
            });
            $.getJSON('/find-similar/?name='+event.target.value).done(function(data){
                if (data.status === true) {
                    this.setState({
                        artists: data.artists,
                        loading: false
                    });
                } else {
                    this.setState({
                        artists: [],
                        loading: false
                    });
                }
            }.bind(this));
        }
    },

    render: function(){
        return (
            <div className="app">
                <input type="text" placeholder="Digite uma artista" onKeyUp={this.search} />
                <p className={this.state.loading ? 'loader show' : 'loader'}>Aguarde...</p>
                <ArtistList artists={this.state.artists} />
            </div>
        );
    }
});


React.render(<SimilarArtists />, document.getElementById('app'));
