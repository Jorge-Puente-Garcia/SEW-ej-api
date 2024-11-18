class Circuito{
    constructor(){
    }

    muestraXML(){   
        $(document).ready(function() {
            $('input[name="XML"]').on('change', function(event) {
                var file = event.target.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $('section:first-of-type').text(reader.result);
                    };
                    reader.readAsText(file);
                }
            });
        });
    }

    muestraSVG(){   
        $(document).ready(function() {
            $('input[name="SVG"]').on('change', function(event) {
                var file = event.target.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $('section:last-of-type').text(reader.result);
                    };
                    reader.readAsText(file);
                }
            });
        });
    }

    leeKML(kmlEntrada) {
        const archivo = kmlEntrada.files[0];
    
        if (!archivo) {
            alert("Error: No has seleccionado un archivo válido.");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const contenido = e.target.result;
    
            try {
                // Extraer coordenadas del contenido del archivo KML
                const coordenadas = this.extraerCoordenadasKML(contenido);
    
                // Crear el mapa con las coordenadas extraídas
                this.mostrarMapaConCoordenadas(coordenadas);
            } catch (error) {
                //En el caso de que haya un error, se avisa para su mmejor localizacíon
                alert("Error al procesar el archivo KML: " + error.message);
            }
        };
    
        reader.readAsText(archivo);
    }

    extraerCoordenadasKML(contenidoKML) {
        const regexCoordenadas = /<coordinates>([\s\S]*?)<\/coordinates>/;
        const match = contenidoKML.match(regexCoordenadas);
    
        if (!match) {
            throw new Error("No se encontraron coordenadas en el archivo KML.");
        }
    
        const listaCoordenadas = match[1]
            .trim()
            .split("\n")
            .map((linea) => {
                //Se separan las coordenadas por coma y se convierten a números
                const [longitud, latitud] = linea.split(",").map(parseFloat);
                //Se devuelven las coordenadas.
                return [longitud, latitud];
            });
    
        return listaCoordenadas;
    }

    mostrarMapaConCoordenadas(coordenadas) {
        // Crear un contenedor para el mapa
        const contenedor = document.createElement("div");
        contenedor.style.width = "70%";
        contenedor.style.height = "40em";
        document.querySelector("body").appendChild(contenedor);
        
        mapboxgl.accessToken = "pk.eyJ1Ijoiam9yZ2VwZyIsImEiOiJjbTNsc21nYzkwcm9pMnNwZTFnaGt6eDg0In0.vu6rFOwvQ1HmDejekGF43A";
    
        const mapa = new mapboxgl.Map({
            container: contenedor,
            style: "mapbox://styles/mapbox/streets-v9",
            zoom: 15,
        });
    
        // Ajustar tamaño del mapa
        mapa.resize();
    
        mapa.on("load", () => {
            // Agregar capa de polilínea para que se marque el circuito
            mapa.addSource("kmlPolyline", {
                type: "geojson",
                data: {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: coordenadas,
                    },
                },
            });
    
            mapa.addLayer({
                id: "kmlPolylineLayer",
                type: "line",
                source: "kmlPolyline",
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": "#FF0000",
                    "line-width": 3,
                },
            });
    
            // Ajustar límites del mapa
            const bounds = coordenadas.reduce(
                (b, coord) => b.extend(coord),
                new mapboxgl.LngLatBounds(coordenadas[0], coordenadas[0])
            );
            mapa.fitBounds(bounds, { padding: 18 });
        });
    }  

}