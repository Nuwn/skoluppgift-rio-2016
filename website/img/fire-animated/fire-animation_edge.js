/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'fire-01',
                            type: 'image',
                            rect: ['2px', '0px', '96px', '159px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"fire-01.svg",'0px','0px']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '103px', '165px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,0.00)",[270,[['rgba(81,44,139,0.00)',100],['rgba(255,255,255,1.00)',100]]]]
                        }
                    }
                },
                timeline: {
                    duration: 400,
                    autoPlay: true,
                    labels: {
                        "loop": 0
                    },
                    data: [
                        [
                            "eid86",
                            "top",
                            100,
                            50,
                            "linear",
                            "${fire-01}",
                            '15px',
                            '0px'
                        ],
                        [
                            "eid87",
                            "top",
                            150,
                            100,
                            "linear",
                            "${fire-01}",
                            '0px',
                            '9px'
                        ],
                        [
                            "eid88",
                            "top",
                            250,
                            100,
                            "linear",
                            "${fire-01}",
                            '9px',
                            '0px'
                        ],
                        [
                            "eid94",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${fire-01}",
                            '1',
                            '1'
                        ],
                        [
                            "eid95",
                            "left",
                            0,
                            150,
                            "linear",
                            "${fire-01}",
                            '2px',
                            '11px'
                        ],
                        [
                            "eid96",
                            "left",
                            150,
                            50,
                            "linear",
                            "${fire-01}",
                            '11px',
                            '2px'
                        ],
                        [
                            "eid97",
                            "left",
                            200,
                            100,
                            "linear",
                            "${fire-01}",
                            '2px',
                            '9px'
                        ],
                        [
                            "eid98",
                            "left",
                            300,
                            100,
                            "linear",
                            "${fire-01}",
                            '9px',
                            '2px'
                        ],
                        [
                            "eid99",
                            "width",
                            0,
                            50,
                            "linear",
                            "${fire-01}",
                            '98px',
                            '89px'
                        ],
                        [
                            "eid100",
                            "width",
                            50,
                            50,
                            "linear",
                            "${fire-01}",
                            '89px',
                            '98px'
                        ],
                        [
                            "eid101",
                            "width",
                            100,
                            50,
                            "linear",
                            "${fire-01}",
                            '98px',
                            '89px'
                        ],
                        [
                            "eid102",
                            "width",
                            150,
                            50,
                            "linear",
                            "${fire-01}",
                            '89px',
                            '98px'
                        ],
                        [
                            "eid103",
                            "width",
                            200,
                            50,
                            "linear",
                            "${fire-01}",
                            '98px',
                            '84px'
                        ],
                        [
                            "eid104",
                            "width",
                            250,
                            150,
                            "linear",
                            "${fire-01}",
                            '84px',
                            '98px'
                        ],
                        [
                            "eid89",
                            "height",
                            100,
                            50,
                            "linear",
                            "${fire-01}",
                            '150px',
                            '165px'
                        ],
                        [
                            "eid90",
                            "height",
                            150,
                            50,
                            "linear",
                            "${fire-01}",
                            '165px',
                            '155px'
                        ],
                        [
                            "eid91",
                            "height",
                            200,
                            50,
                            "linear",
                            "${fire-01}",
                            '155px',
                            '156px'
                        ],
                        [
                            "eid92",
                            "height",
                            250,
                            100,
                            "linear",
                            "${fire-01}",
                            '156px',
                            '157px'
                        ],
                        [
                            "eid93",
                            "height",
                            350,
                            50,
                            "linear",
                            "${fire-01}",
                            '157px',
                            '165px'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("fire-animation_edgeActions.js");
})("EDGE-392926107");
