TT_INT = "TT_INT"
TT_FLOAT = "FLOAT"
TT_- = "MINUS"
TT_+ = "PLUS"
TT_* = "MUL"
TT_/ = "DIV"
TT_( = "LPAREN"
TT_) = "RPAREN"

class Token:
    def __init__(self, type_, value):
        self.type = type_
        self.value = value

    def __repr__(self):
        if self.value: return f'${self.type}:${self.value}'
        return f'${self.type}'
class Lexer:
    def __init__(self, text)