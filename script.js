/*
 * Copyright (c) 2012-2017 Mark C. Prins <mprins@users.sf.net>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

/**
 * add layers to the map based on the olMapOverlays object.
 */
function olovAddToMap() {
    if (olEnable) {
        for (const key in olMapOverlays) {
            const overlay = olMapOverlays[key];
            const m = olMaps[overlay.id];

            switch (overlay.type) {
                case 'osm':
                    m.addLayer(new ol.layer.Tile({
                        title:   overlay.name,
                        visible: (overlay.visible).toLowerCase() == 'true',
                        opacity: parseFloat(overlay.opacity),
                        source:  new ol.source.OSM({
                            url:          overlay.url,
                            attributions: overlay.attribution
                        })
                    }));
                    break;
                // case 'wms':
                //     m.addLayer(new OpenLayers.Layer.WMS(overlay.name, overlay.url, {
                //         layers:      overlay.layers,
                //         version:     overlay.version,
                //         transparent: overlay.transparent,
                //         format:      overlay.format
                //     }, {
                //         opacity:     parseFloat(overlay.opacity),
                //         visibility:  (overlay.visible).toLowerCase() == 'true',
                //         isBaseLayer: !1,
                //         attribution: overlay.attribution
                //     }));
                //     break;
                // case 'ags':
                //     m.addLayer(new OpenLayers.Layer.ArcGIS93Rest(overlay.name, overlay.url, {
                //         layers:      overlay.layers,
                //         transparent: overlay.transparent,
                //         format:      overlay.format
                //     }, {
                //         opacity:     parseFloat(overlay.opacity),
                //         visibility:  (overlay.visible).toLowerCase() == 'true',
                //         isBaseLayer: !1,
                //         attribution: overlay.attribution
                //     }));
                //     break;
                // case 'mapillary':
                //     var mUrl = 'http://api.mapillary.com/v1/im/search?';
                //     if (overlay.skey !== '') {
                //         mUrl = 'http://api.mapillary.com/v1/im/sequence?';
                //     }
                //     var mLyr = new OpenLayers.Layer.Vector(
                //         "Mapillary", {
                //             projection:  new OpenLayers.Projection("EPSG:4326"),
                //             strategies:  [new OpenLayers.Strategy.BBOX({
                //                 ratio:     1.1,
                //                 resFactor: 1.5
                //             }) /* ,new OpenLayers.Strategy.Cluster({}) */],
                //             protocol:    new OpenLayers.Protocol.HTTP({
                //                 url:            mUrl,
                //                 format:         new OpenLayers.Format.GeoJSON(),
                //                 params:         {
                //                     // default to max. 250 locations
                //                     'max-results': 250,
                //                     'geojson':     true,
                //                     'skey':        overlay.skey
                //                 },
                //                 filterToParams: function (filter, params) {
                //                     if (filter.type === OpenLayers.Filter.Spatial.BBOX) {
                //                         // override the bbox serialization of
                //                         // the filter to give the Mapillary
                //                         // specific bounds
                //                         params['min-lat'] = filter.value.bottom;
                //                         params['max-lat'] = filter.value.top;
                //                         params['min-lon'] = filter.value.left;
                //                         params['max-lon'] = filter.value.right;
                //                         // if the width of our bbox width is
                //                         // less than 0.15 degrees drop the max
                //                         // results
                //                         if (filter.value.top - filter.value.bottom < .15) {
                //                             OpenLayers.Console.debug('dropping max-results parameter, width is: ',
                //                                 filter.value.top - filter.value.bottom);
                //                             params['max-results'] = null;
                //                         }
                //                     }
                //                     return params;
                //                 }
                //             }),
                //             styleMap:    new OpenLayers.StyleMap({
                //                 'default': {
                //                     cursor:          'help',
                //                     rotation:        '${ca}',
                //                     externalGraphic: DOKU_BASE + 'lib/plugins/openlayersmapoverlays/icons/arrow-up-20.png',
                //                     graphicHeight:   20,
                //                     graphicWidth:    20,
                //                 },
                //                 'select':  {
                //                     externalGraphic: DOKU_BASE + 'lib/plugins/openlayersmapoverlays/icons/arrow-up-20-select.png',
                //                     label:           '${location}',
                //                     fontSize:        '1em',
                //                     fontFamily:      'monospace',
                //                     labelXOffset:    '0.5',
                //                     labelYOffset:    '0.5',
                //                     labelAlign:      'lb',
                //                 }
                //             }),
                //             attribution: '<a href="http://www.mapillary.com/legal.html">' +
                //                              '<img src="http://mapillary.com/favicon.ico" ' +
                //                              'alt="Mapillary" height="16" width="16" />Mapillary (CC-BY-SA)',
                //             visibility:  (overlay.visible).toLowerCase() == 'true',
                //         });
                //     m.addLayer(mLyr);
                //     selectControl.addLayer(mLyr);
                //     break;
                // case 'search':
                //     m.addLayer(new OpenLayers.Layer.Vector(
                //         overlay.name,
                //         overlay.url,
                //         {
                //             layers:      overlay.layers,
                //             version:     overlay.version,
                //             transparent: overlay.transparent,
                //             format:      overlay.format
                //         }, {
                //             opacity:     parseFloat(overlay.opacity),
                //             visibility:  (overlay.visible).toLowerCase() == 'true',
                //             isBaseLayer: !1,
                //             attribution: overlay.attribution
                //         }
                //     ));
                //     break;
            }
        }
    }
}

var olMapOverlays = {};

jQuery(olovAddToMap);
