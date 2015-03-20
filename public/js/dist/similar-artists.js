var ArtistList = React.createClass({displayName: "ArtistList",
    render: function(){
        var items = this.props.artists.map(function(item, i) {
            return React.createElement("li", {key: item.name}, item.name)
        }.bind(this));
        return (
            React.createElement("ul", null, 
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
                }
            }.bind(this));
        }
    },

    render: function(){
        return (
            React.createElement("div", {className: "app"}, 
                React.createElement("input", {type: "text", placeholder: "Digite uma artista", onKeyUp: this.search}), 
                React.createElement("p", {style: {display:this.state.loading ? 'block' : 'none'}}, "Aguarde..."), 
                React.createElement(ArtistList, {artists: this.state.artists})
            )
        );
    }
});


React.render(React.createElement(SimilarArtists, null), document.getElementById('app'));
