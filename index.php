<?php

use Kirby\Http\Response;
use Kirby\Form\Form;

Kirby::plugin('sietseveenman/kirby3-language-sync', [

    'fields' => [
        'sync' => [
            'props' => [
                'buttonIcon' => function (string $icon = 'wand') {
                    return $icon;
                },
                'buttonLabel' => function (string $label = null) {
                    return $label;
                },
                'languages' => function () {
                    $mapped = array_map(function($lang) {
                        return $lang->name();
                    }, kirby()->languages()->data() );
                    return $mapped;
                },
                'pageID' => function () {
                    $page = $this->attrs()['model'];
                    return $page->id();
                },
                'pageFields' => function () {
                    $page = $this->attrs()['model'];

                    $blueprintFields = $page->blueprint()->fields();

                    $syncableFields = array_filter($blueprintFields, function($field) { 
                        return 
                            !( array_key_exists('translate', $field) && !$field['translate'] ) 
                            && 'sync' !== $field['type']; 
                    });

                    return array_values( $syncableFields ); 
                }
            ],
        ],
    ],

    'api' => [
        'routes' => [
            [
                'pattern' => 'sync-lang/(:any)',
                'method' => 'POST',
                'action'  => function ($encodedPageID) {
                    
                    try {
                        
                        $request = kirby()->request();
                        $page = site()->index(true)->find( urldecode( $encodedPageID ) );
                       
                        $formFromOtherLanguage = Form::for($page, [
                            'language' => $request->get('fromLang')
                        ]);
                        
                        $requiredFieldsFromOtherLanguage = 
                            array_filter( $formFromOtherLanguage->fields()->toArray(), function($field) {
                                return $field['type'] !== 'sync' && $field['translate'];
                            });

                    } catch (Exception $e) {
                        return Response::json([
                            'success' => false,
                            'message' => $e->getMessage()
                        ], 500);
                    }

                    return Response::json([
                        'success' => true,
                        'content' => array_values( $requiredFieldsFromOtherLanguage )
                    ], 200);
                }
            ]
        ]
    ]
]);