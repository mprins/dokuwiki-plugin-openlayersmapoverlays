<?php
/*
 * Copyright (c) 2012 Mark C. Prins <mprins@users.sf.net>
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


// must be run within Dokuwiki
if (!defined('DOKU_INC')) die();

if (!defined('DOKU_LF')) define('DOKU_LF', "\n");
if (!defined('DOKU_TAB')) define('DOKU_TAB', "\t");
if (!defined('DOKU_PLUGIN')) define('DOKU_PLUGIN',DOKU_INC.'lib/plugins/');

require_once DOKU_PLUGIN.'syntax.php';

class syntax_plugin_openlayersmapoverlays_osmlayer extends DokuWiki_Syntax_Plugin {

	private $dflt = array (
			'id'			=> 'olmap',
			'name'			=>'',
			'url'			=>'',
			'opacity'		=>1.0,
			'attribution'	=>'',
			'visible'		=>false,
			'cors'			=>null
	);

	public function getType() {
		//return 'FIXME: container|baseonly|formatting|substition|protected|disabled|paragraphs';
		return 'substition';
	}

	public function getSort() {
		return 902;
	}

	public function connectTo($mode) {
		//look for: <olmap_osmlayer id="olmap" name="sport" url="http://tiles.openseamap.org/sport/${z}/${x}/${y}.png" visible="false" opacity=0.6 attribution="Some attribution"></olmap_osmlayer>
		$this->Lexer->addSpecialPattern('<olmap_osmlayer ?[^>\n]*>.*?</olmap_osmlayer>', $mode, 'plugin_openlayersmapoverlays_osmlayer');
	}

	public function handle($match, $state, $pos, &$handler){
		$param = array ();
		$data = $this->dflt;;

		preg_match_all('/(\w*)="(.*?)"/us', $match, $param, PREG_SET_ORDER);

		foreach ($param as $kvpair) {
			list ($matched, $key, $val) = $kvpair;
			if (isset ($data[$key])){
				$key = strtolower($key);
				$data[$key] = $val;
			}
		}
		dbglog($data,'syntax_plugin_overlayer::handle: parsed data is:');
		return $data;
	}

	public function render($mode, &$renderer, $data) {
		if($mode != 'xhtml') return false;

		static $overlaynumber = 0; // incremented for each olmap_osmlayer tag in the page source

		list ($id, $url, $name, $visible) = $data;
		$renderer->doc .="\n<script type='text/javascript'><!--//--><![CDATA[//><!--\n";
		$str = '{';
		foreach ( $data as $key => $val ) {
			$str .= "'".$key."' : '".$val."',";
		}
		$str = substr($str,0,-1) .'}';
		$renderer->doc .="olMapOverlays['".$overlaynumber."'] = ".$str.";\n//--><!]]></script>";
		$overlaynumber++;
		return true;
	}
}
