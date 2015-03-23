var Player = new Audio();

var ArtistList = React.createClass({
    play: function(id, event) {
        var el = event.target;
        $(el).addClass('loading');

        $.ajax({
            context: this,
            url: '/get-artist-track/',
            data: {
                id: id
            }
        }).done(function(data){
            if (data.status) {
                $(this.getDOMNode()).find('li').removeClass('active');
                $(el).removeClass('loading');
                $(el).addClass('active');
                Player.pause();
                Player.src = data.url;
                Player.play();
            } else {
                alert('Não foi possível reproduzir o áudio!')
            }
        });
    },

    render: function(){
        var items = this.props.artists.map(function(item, i) {
            return (
                <li key={item.name} onClick={this.play.bind(this, item.id)}>
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
            artists: localStorage.getItem('artists') ? JSON.parse(localStorage.getItem('artists')) : []
        }
    },

    search: function(event) {
        if (event.keyCode === 13) {
            this.setState({
                loading: true
            });
            localStorage.setItem('last_search', event.target.value);
            $.getJSON('/find-similar/?name='+event.target.value).done(function(data){
                if (data.status === true) {
                    localStorage.setItem('artists', JSON.stringify(data.artists));
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
                <input type="text" placeholder="Digite um artista" onKeyUp={this.search} />
                <p className={this.state.loading ? 'loader show' : 'loader'}>Aguarde...</p>
                <ArtistList artists={this.state.artists} />
            </div>
        );
    }
});


React.render(<SimilarArtists />, document.getElementById('app'));
