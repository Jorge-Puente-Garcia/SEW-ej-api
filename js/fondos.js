class Fondo{
  nombrePais;
  nombreCapital;
  nombreCircuitoF1;
  constructor(nombrePais, nombreCapital, nombreCircuitoF1){
    this.nombrePais = nombrePais;
    this.nombreCapital = nombreCapital;
    this.nombreCircuitoF1 = nombreCircuitoF1;
  }

  consultaImagenFondo(){
    var flickrAPI = "https://www.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
            $.getJSON(flickrAPI, 
                    {
                        tags: "HUNGRIA 2005",
                        tagmode: "all",
                        format: "json"
                    })
                .done(function(data) {
                        $.each(data.items, function(i,item ) {
                            //$("<img />").attr( "src", item.media.m).appendTo( "body" );
                            
                            if ( i === Math.random(0,5)) {
                              //Solo devuelve la primera imagen
                                    return false;
                            }
                            var url= item.media.m;
                            $('main').css({
                              'background-image': 'url(' + url + ')',
                              'background-size': 'cover',
                              'background-repeat': 'no-repeat',
                              'background-position': 'center',
                              'margin':'0',
                              'height': '100vh'
                            });
                            
                });
            });
  }
}