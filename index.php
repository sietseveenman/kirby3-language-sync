<?php

use Kirby\Http\Header;
use Kirby\Http\Response;

Kirby::plugin('sietseveenman/kirby3-language-sync', [

    'fields' => [
        'sync' => [
            'props' => [
                'button_label' => function (string $label = null) {
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

                    $pageFields = $page->blueprint()->fields();

                    $translatableFields = array_filter($pageFields, function( $field ){ 
                        return !( array_key_exists('translate', $field) && !$field['translate'] ); 
                    });
                    
                    $fieldsWithoutSyncField = array_filter($translatableFields, function( $field ){
                        return $field['type'] !== 'sync'; 
                    });

                    return array_values( $fieldsWithoutSyncField ); 
                },
                'render' => function (bool $render = true) {
                    return $render;
                },
            ],
        ],
    ],

    'api' => [
        'routes' => [
            [
                'pattern' => 'sync-lang/(:any)',
                'method' => 'POST',
                'action'  => function ($encodedPageID) {
                    $request = kirby()->request();
                    $fromLang = $request->get('fromLang');

                    try {
                        $pageID = urldecode($encodedPageID);
                        $page = site()->index(true)->find($pageID);

                        $pageBlueprintFields = $page->blueprint()->fields();
                        $content = $page->content($fromLang);

                        $contentWithInfoFromBlueprint = array_map(function($value, $key) use ($pageBlueprintFields, $content) {

                            $fieldType = $pageBlueprintFields[$key]['type'];
                            
                            if ( $fieldType === 'files' ) {
                                $files = $content->$key()->toFiles();
                                $files->map(function($file) { return $file->panelPickerData(); } );
                                $value = $files->values();
                            }

                            return [
                                'key' => $key,
                                'value' => $value,
                                'type' => $fieldType
                            ];

                        }, $content->toArray(), $content->keys());

                        // dump($pageBlueprintFields);
                        // dump($content);
                        // dump($contentWithInfoFromBlueprint);
                        // die;

                    } catch (Exception $e) {
                        return Response::json([
                            'success' => false,
                            'message' => $e->getMessage()
                        ], 200);
                    }

                    return Response::json([
                        'success' => true,
                        'content' => $contentWithInfoFromBlueprint
                    ], 200);
                }
            ]
        ]
    ]
]);


