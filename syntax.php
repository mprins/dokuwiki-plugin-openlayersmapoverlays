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

class syntax_plugin_overlayer extends DokuWiki_Syntax_Plugin {
	public function getType() {
		//return 'FIXME: container|baseonly|formatting|substition|protected|disabled|paragraphs';
		return 'substition';
	}

	public function getSort() {
		return 902;
	}

	public function connectTo($mode) {
		//look for: <overlayer id="olmap" name="sport" url="http://tiles.openseamap.org/sport/${z}/${x}/${y}.png" visible="false"></overlayer>
		$this->Lexer->addSpecialPattern('<overlayer ?[^>\n]*>.*?</overlayer>', $mode, 'plugin_overlayer');
	}

	public function handle($match, $state, $pos, &$handler){
		$param = array ();
		$data = array ();

		preg_match_all('/(\w*)="(.*?)"/us', $match, $param, PREG_SET_ORDER);

		foreach ($param as $kvpair) {
			list ($matched, $key, $val) = $kvpair;
			$key = strtolower($key);
			$data[$key] = strtolower($val);
		}
		return $data;
	}

	public function render($mode, &$renderer, $data) {
		if($mode != 'xhtml') return false;

		list ($id, $url, $name, $visible) = $data;
		$renderer->doc .="\n<script type='text/javascript'><!--//--><![CDATA[//><!--\n";
		$renderer->doc .="olMapOverlays['".$data['id']."'] = {'id':'".$data['id']."','url':'".$data['url']."', 'name':'".$data['name']."', 'visible':'".$data['visible']."'};\n//--><!]]></script>";

		return true;
	}
}
