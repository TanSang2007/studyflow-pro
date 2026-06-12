#include <iostream>
#include <string>
#include <cmath>
#include <stack>

using namespace std;

// 1. Cấu trúc một nút trong danh sách liên kết
struct Node {
    string data;
    Node* next;
};

// 2. Cấu trúc Stack dựa trên Linked List
struct Stack {
    Node* top = nullptr;

    bool isEmpty() {
        return top == nullptr;
    }

    void push(string value) {
        Node* newNode = new Node();
        newNode->data = value;
        newNode->next = top;
        top = newNode;
    }

    string pop() {
        if (isEmpty()) return "";
        Node* temp = top;
        string val = temp->data;
        top = top->next;
        delete temp;
        return val;
    }

    string peek() {
        if (isEmpty()) return "";
        return top->data;
    }
};

// 3. Kiểm tra độ ưu tiên toán tử
int priority(char c) {
    if (c == '+' || c == '-') return 1;
    if (c == '*' || c == '/') return 2;
    if (c == '^') return 3;
    return 0;
}

// 4. KIỂM TRA BIỂU THỨC HỢP LỆ (Dấu ngoặc)
bool isValid(string exp) {
    Stack s;
    for (char c : exp) {
        if (c == '(') s.push("(");
        else if (c == ')') {
            if (s.isEmpty()) return false;
            s.pop();
        }
    }
    return s.isEmpty();
}

// 5. CHUYỂN TRUNG TỐ SANG HẬU TỐ (Infix to Postfix)
string toPostfix(string exp) {
    Stack s;
    string res = "";
    for (int i = 0; i < exp.length(); i++) {
        char c = exp[i];

        // Nếu là số (hỗ trợ số có nhiều chữ số)
        if (isdigit(c)) {
            while (i < exp.length() && (isdigit(exp[i]))) {
                res += exp[i++];
            }
            res += " ";
            i--;
        }
        else if (c == '(') s.push("(");
        else if (c == ')') {
            while (!s.isEmpty() && s.peek() != "(") {
                res += s.pop() + " ";
            }
            s.pop(); // Bỏ dấu '('
        }
        else if (c == '+' || c == '-' || c == '*' || c == '/') {
            while (!s.isEmpty() && priority(s.peek()[0]) >= priority(c)) {
                res += s.pop() + " ";
            }
            string op(1, c);
            s.push(op);
        }
    }
    while (!s.isEmpty()) {
        res += s.pop() + " ";
    }
    return res;
}

// 6. TÍNH GIÁ TRỊ BIỂU THỨC HẬU TỐ
double evaluatePostfix(string postfix) {
    Stack s;
    string temp = "";
    for (int i = 0; i < postfix.length(); i++) {
        if (postfix[i] == ' ') continue;

        if (isdigit(postfix[i])) {
            string num = "";
            while (i < postfix.length() && postfix[i] != ' ') {
                num += postfix[i++];
            }
            s.push(num);
        } else {
            double val2 = stod(s.pop());
            double val1 = stod(s.pop());
            switch (postfix[i]) {
                case '+': s.push(to_string(val1 + val2)); break;
                case '-': s.push(to_string(val1 - val2)); break;
                case '*': s.push(to_string(val1 * val2)); break;
                case '/': s.push(to_string(val1 / val2)); break;
            }
        }
    }
    return stod(s.pop());
}

int main() {
    string expression;
    cout << "Nhap bieu thuc (vd: 2*(3+4)): ";
    cin >> expression;

    if (!isValid(expression)) {
        cout << "Bieu thuc khong hop le (sai dau ngoac)!" << endl;
        return 0;
    }

    string postfix = toPostfix(expression);
    cout << "Dang hau to (Postfix): " << postfix << endl;
    cout << "Gia tri bieu thuc: " << evaluatePostfix(postfix) << endl;

    return 0;
}