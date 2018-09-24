CONFIG_SCHEMA = {
    "type": "object",
    "properties": {
        "config": {
            "type": "object",
            "properties": {
                "L1": {"type": "string"},
                "L2": {"type": "string"},
                "credits": {"type": "array",
                       "items": {
                           "type": "object",
                           "properties": {
                               "role": {"type": "string"},
                               "name": {"type": "string"}
                           }
                       }},
            },
            "required": ["L1", "L2"]
        },
        "data": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "manifest_path": {"type": "string"},
                    "resource_path": {"type": "string"}
                },
                "required": ["manifest_path", "resource_path"]
            }
        },
        "adhoc_vars": {
            "type": "array",
            "items": {
                "type": "object"
            }
        }
    },
    "required": ["config", "data"]
}


MANIFEST_SCHEMA = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "display": {"type": "string"},
        "compare": {"type": "string"},
        "sorting": {"type": "string"},
        "transducers": {"type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "source": {"type": "string"},
                                "target": {"type": "string"},
                                "function": {"type": "string"}
                            },
                            "required": ["source", "target", "function"]
                            }
                        },
        "targets": {
            "type": "object",
            "properties": {
                "word": {"type": "string"},
                "definition": {"type": "string"},
                "entryID": {"type": "string"},
                "optional": {"type": "array",
                             "items": {
                                 "type": "object"
                             }},
                "theme": {"type": "string"},
                "secondary_theme": {"type": "string"},
                "audio": {"type": "array",
                          "items": {
                              "type": "object",
                              "properties": {
                                  "speaker": "string",
                                  "filename": "string"
                              }
                          }},
                "definition_audio": {"type": "array",
                          "items": {
                              "type": "object",
                              "properties": {
                                  "speaker": "string",
                                  "filename": "string"
                              }
                          }},
                "example_sentence": {"type": "array",
                            "items": {
                                "type": "string"
                            }},
                "example_sentence_definition": {"type": "array",
                            "items": {
                                "type": "string"
                            }},
                "example_sentence_audio": {"type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "speaker": "string",
                                        "filename": "string"
                                    }
                                }
                            }}, 
                "example_sentence_definition_audio": {"type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "speaker": "string",
                                        "filename": "string"
                                    }
                                }
                            }},
                "img": {"type": "string"}
            },
            "required": ["word", "definition"]
        }},
    "required": ["name", "sorting", "targets"]
}