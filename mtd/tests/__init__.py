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
                "optional": {"type": "object"},
                "theme": {"type": "string"},
                "secondary_theme": {"type": "string"},
                "audio": {"type": "string"},
                "img": {"type": "string"}
            },
            "required": ["word", "definition"]
        }
    },
    "required": ["name", "sorting"]
}