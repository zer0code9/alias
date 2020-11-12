TT_INT = "TT_INT"
TT_FLOAT = "FLOAT"
TT_MINUS = "MINUS"
TT_PLUS = "PLUS"

class Token:
    def __init__(self, type_, value):
        self.type = type_
        self.value = value

    def __repr__(self):
        if self.value: return f'${self.type}:${self.value}'
        return f'${self.type}'