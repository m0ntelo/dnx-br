<?php

  add_action('wp_ajax_nopriv_mail', 'submit_email');
  add_action('wp_ajax_verify_mail', 'submit_email');
  
  function submit_email() { 
    
    $data         =  stripslashes(( $_REQUEST['email'] ));
    $objPHP       =  json_decode( $data );

    $nome         =  $objPHP->nome;
    $telefone     =  $objPHP->telefone;
    $telefone_op  =  $objPHP->telefone_op;
    $email        =  $objPHP->email;
    $empresa      =  $objPHP->empresa;
    $cnpj         =  $objPHP->cnpj;
    $cidade       =  $objPHP->cidade;

    $subject = 'Solicitação de Contato Plano Empresário Banpará';
    $headers = array('Content-Type: text/html; charset=UTF-8'); 
  
    $body  = '<html><body>';
    $body .= '<p style="color:#000; font-size:18px;">Tenho interesse no Plano Empresário Banpará e gostaria de receber informações através dos contatos abaixo.</p>';
    $body .= '<p style="color:#000; font-size:12px;"><b>Nome: </b>' . $nome . '</p>';
    $body .= '<p style="color:#000; font-size:12px;"><b>Telefone: </b>' . $telefone . '</p>';
    $body .= '<p style="color:#000; font-size:12px;"><b>Telefone (Opcional): </b>' . $telefone_op . '</p>';
    $body .= '<p style="color:#000; font-size:12px;"><b>E-mail: </b>' . $email . '</p>';
    $body .= '<p style="color:#000; font-size:12px;"><b>Empresa: </b>' . $empresa . '</p>';
    $body .= '<p style="color:#000; font-size:12px;"><b>CNPJ: </b>' . $cnpj . '</p>';
    $body .= '<p style="color:#000; font-size:12px;"><b>Cidade: </b>' . $cidade . '</p>';
    $body .= '</body></html>';

    $sent = wp_mail( $to = '', $subject, $body, $headers );
    
    echo json_encode( $sent );

    wp_die();
  
  }

  add_action( 'phpmailer_init', 'mailer_config', 10, 1);

  function mailer_config( PHPMailer $mailer ) {

    $mailer->IsSMTP();
    $mailer->Host = "mailserver.banpara.com";
    $mailer->From = 'odibanpara@banparanet.com.br'; 
    $mailer->FromName = 'Contato Portal Imobiliário PJ'; 
    // $mailer->AddAddress('GEOPJ@banparanet.com.br', '');
    $mailer->AddAddress('wilson.montelo@vibedesenv.com', '');
    $mailer->AddAddress('bleno.vale@vibedesenv.com', '');
    $mailer->Port = 25;
    $mailer->CharSet  = "utf-8";
    
  }

?>