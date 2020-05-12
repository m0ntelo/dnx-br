<?php

add_action('wp_ajax_nopriv_verify_recaptcha', 'verify_google_recaptcha');
add_action('wp_ajax_verify_recaptcha', 'verify_google_recaptcha');

function verify_google_recaptcha() {
    
    if ( $_SERVER["REQUEST_METHOD"] == "POST" ) {
        if ( isset($_REQUEST['recaptcha']) ) {

            $secretKey   = "6Lc1WdoUAAAAAFGJijbRqAQDjM1oZPW6GASpv5LB";
            $responseKey = $_REQUEST['recaptcha'];
            $ip          = $_SERVER['REMOTE_ADDR'];
            
            $url         = "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$responseKey&remoteip=$ip";
            $response    = wp_remote_get($url);

        } else {
            $response['success'] = false;
            $response['error-codes']['error-code'] = 'empty-recaptch-response';
        }       
    } else {
        http_response_code(500);
    }
    
    header('Content-Type: application/json');
    echo json_encode($response);

    wp_die();
}
?>

