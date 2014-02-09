/*
 * Copyright (c) 2012-2014 Mark C. Prins <mprins@users.sf.net>
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
		for ( var key in olMapOverlays) {
			var overlay = olMapOverlays[key];
			var m = olMaps[overlay.id];

			switch (overlay.type) {
			case 'osm':
				m.addLayer(new OpenLayers.Layer.OSM(overlay.name,
								overlay.url, {
									// transitionEffect : 'resize',
									isBaseLayer : !1,
									opacity : parseFloat(overlay.opacity),
									attribution : overlay.attribution,
									visibility : (overlay.visible)
											.toLowerCase() == 'true',
									tileOptions : {
										crossOriginKeyword : null
									}
								}));
				break;
			case 'wms':
				m.addLayer(new OpenLayers.Layer.WMS(overlay.name,
								overlay.url, {
									layers : overlay.layers,
									version : overlay.version,
									transparent : overlay.transparent,
									format : overlay.format
								}, {
									opacity : parseFloat(overlay.opacity),
									visibility : (overlay.visible)
											.toLowerCase() == 'true',
									isBaseLayer : !1,
									attribution : overlay.attribution
								}));
				break;
			}
		}
	}
}

var olMapOverlays = new Object();

jQuery(olovAddToMap);
