var ArtistList = React.createClass({displayName: "ArtistList",
    render: function(){
        var items = this.props.artists.map(function(item, i) {
            return (
                React.createElement("li", {key: item.name}, 
                    React.createElement("img", {src: item.image ? item.image.url : '', height: "180"}), 
                    React.createElement("p", null, item.name)
                )
            )
        }.bind(this));
        return (
            React.createElement("ul", {className: "artist-list"}, 
                items
            )
        );
    }
});

var SimilarArtists = React.createClass({displayName: "SimilarArtists",
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
            React.createElement("div", {className: "app"}, 
                React.createElement("input", {type: "text", placeholder: "Digite um artista", onKeyUp: this.search}), 
                React.createElement("p", {className: this.state.loading ? 'loader show' : 'loader'}, "Aguarde..."), 
                React.createElement(ArtistList, {artists: this.state.artists})
            )
        );
    }
});


React.render(React.createElement(SimilarArtists, null), document.getElementById('app'));
