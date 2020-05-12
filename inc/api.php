<?php 

// $urlAPI = "http://10.0.101.232/PortalImobiliarioApi/api/"; // prod
$urlAPI = "http://10.0.21.125/PortalImobiliarioApi/api/"; // dev

//
// Interfaces API
//

function response_api( $response ) {
  
  global $isVerifyRequest;
  
  header('Content-Type: application/json');
  
  $response_code = wp_remote_retrieve_response_code( $response );
  $response_body = wp_remote_retrieve_body( $response );
  $response_message = wp_remote_retrieve_response_message( $response );

  http_response_code( $response_code );

  if ( $isVerifyRequest ) {
    if ( !in_array( $response_code, array(200, 201) ) || is_wp_error( $response_body ) ) {
      return array( 'status' => $response_code, 'message' => 'ERRO AO PROCESSAR. TENTE MAIS TARDE.', 'body' => $response_body );
    } else {
      return array( 'status' => $response_code, 'message' => $response_message, 'body' => $response_body );
    }
  } else {
    return array( 'status' => $response_code, 'message' => 'ERRO AO PROCESSAR. TENTE MAIS TARDE.', 'body' => '' );
  }
}

add_action('wp_ajax_nopriv_municipio', 'get_municipio');
add_action('wp_ajax_municipio', 'get_municipio');

function get_municipio() {
  
  global $urlAPI;
  $interface  =  "Municipio";
  $endpoint   =  $urlAPI . $interface;
  $response   =  wp_remote_get( $endpoint );
 
  wp_die( json_encode( response_api( $response ), true ) );
  
}

if ( isAjaxRequest() ) {
  $isVerifyRequest = true;
} else {
  $isVerifyRequest = false;  
}

function isAjaxRequest() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH']==='XMLHttpRequest';
}

?>