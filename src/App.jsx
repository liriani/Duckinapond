import React, { useState } from 'react';
import {
    Terminal, FolderPlus, ChevronRight, Laptop, Code2, Shield,
    Lightbulb, FileQuestion, Users, Hash, LayoutGrid, CheckCircle,
    GitBranch, BookOpen, Copy, FileText, PlaySquare
} from 'lucide-react';

// ==========================================
// 1. BASE DE DADOS GLOBAL (C00 E C01 COMPLETOS)
// ==========================================
const modulesData = {
    c00: {
        ex00: {
            name: "ft_putchar",
            context: "Como imprimir uma única letra no terminal.",
            importance: "No C, não existe um comando mágico 'print' no início. Temos de usar a função 'write' do sistema e dizer-lhe exatamente onde a letra está guardada.",
            examTip: "O 'write' nunca aceita a letra diretamente. Ele precisa de saber o 'endereço' (o local na memória) onde a letra está escondida.",
            code: "#include <unistd.h>\n\nvoid\tft_putchar(char c)\n{\n\twrite(1, &c, 1);\n}",
            testCode: "#include <unistd.h>\n\nvoid\tft_putchar(char c);\n\nint\tmain(void)\n{\n\tft_putchar('A');\n\tft_putchar('\\n');\n\treturn (0);\n}",
            expl: {
                2: [
                    "void ➔ Significa que esta função apenas executa uma ação e não devolve resultados.",
                    "char c ➔ Criamos um espaço na memória chamado 'c' para guardar exatamente uma letra (1 byte)."
                ],
                4: [
                    "write ➔ A função do sistema que escreve coisas no ecrã.",
                    "1 ➔ O destino. '1' significa 'escreve no terminal normal' (Standard Output).",
                    "&c ➔ O endereço. O '&' diz ao write: 'vai procurar a informação à morada de memória c'.",
                    "1 ➔ A quantidade. Queremos imprimir apenas 1 letra, ou seja, 1 byte."
                ]
            },
            deepDive: [
                {
                    title: "1. O papel do '&' (E comercial)",
                    text: "Esta é a parte mais importante: O write exige um 'ponteiro' (um endereço). Se passarmos só 'c', ele vai tentar ler a memória errada e o programa estoira (Segmentation Fault). O '&' garante que damos a localização correta."
                }
            ],
            questions: [
                { q: "O que acontece se mudares o último número do write para 2?", a: "Em vez de ler apenas a nossa letra 'c', o write vai ler a nossa letra e também o lixo que estiver guardado no espaço de memória logo a seguir." }
            ]
        },
        ex01: {
            name: "ft_print_alphabet",
            context: "Imprimir o alfabeto do 'a' ao 'z' usando um ciclo.",
            importance: "Mostra que o computador não vê letras, mas sim números (Tabela ASCII). A letra 'a' é o número 97, a letra 'b' é 98, etc. Por isso, podemos somar números às letras.",
            examTip: "A condição `letra <= 'z'` funciona porque 'z' vale 122. O ciclo vai repetindo e somando 1 à letra até chegar ao fim.",
            code: "#include <unistd.h>\n\nvoid\tft_print_alphabet(void)\n{\n\tchar\tc;\n\n\tc = 'a';\n\twhile (c <= 'z')\n\t{\n\t\twrite(1, &c, 1);\n\t\tc++;\n\t}\n}",
            testCode: "void\tft_print_alphabet(void);\n\nint\tmain(void)\n{\n\tft_print_alphabet();\n\treturn (0);\n}",
            expl: {
                6: ["c = 'a' ➔ Guardamos a primeira letra. Na realidade, o C guarda o número 97."],
                7: ["while (c <= 'z') ➔ O ciclo: 'Enquanto a nossa letra for menor ou igual à letra z (122), repete'."],
                10: ["c++ ➔ Somamos 1 à nossa variável. Se era 'a' (97), passa a ser 'b' (98)."]
            },
            deepDive: [
                {
                    title: "1. A Matemática das Letras",
                    text: "O C consegue verificar `c <= 'z'` porque ele compara os valores numéricos por trás das letras. Ao fazer `c++`, estamos efetivamente a navegar pela Tabela ASCII."
                }
            ]
        },
        ex02: {
            name: "ft_print_reverse_alphabet",
            context: "Imprimir o alfabeto ao contrário ('z' até 'a').",
            importance: "Ensina a lógica reversa e o cuidado com os limites dos ciclos. Em vez de somar, subtraímos.",
            examTip: "Cuidado com o sinal na condição do while. Ao andar para trás, usamos `>=` (maior ou igual). Se usares só `>`, o ciclo para antes de imprimir o 'a'.",
            code: "#include <unistd.h>\n\nvoid\tft_print_reverse_alphabet(void)\n{\n\tchar\tc;\n\n\tc = 'z';\n\twhile (c >= 'a')\n\t{\n\t\twrite(1, &c, 1);\n\t\tc--;\n\t}\n}",
            testCode: "void\tft_print_reverse_alphabet(void);\n\nint\tmain(void)\n{\n\tft_print_reverse_alphabet();\n\treturn (0);\n}",
            expl: {
                6: ["c = 'z' ➔ Começamos no topo do alfabeto (122)."],
                7: ["while (c >= 'a') ➔ 'Enquanto a letra atual for maior ou igual ao a (97)'."],
                10: ["c-- ➔ Subtraímos 1. Se era 'z' (122), vira 'y' (121)."]
            },
            deepDive: [
                {
                    title: "1. O Risco de Loop Infinito",
                    text: "Se esqueceres de colocar o `c--`, a variável `c` será sempre 'z'. O ciclo vai ser sempre verdadeiro e o programa vai imprimir 'z' para sempre até esgotar a memória."
                }
            ]
        },
        ex03: {
            name: "ft_print_numbers",
            context: "Imprimir os números de 0 a 9.",
            importance: "Mostra a diferença entre um número matemático (ex: 5) e o CARACTERE de um número (ex: '5'). O `write` imprime caracteres, não inteiros crus.",
            examTip: "Nunca tentes `c = 0`. Tens de usar `c = '0'` (com aspas). O zero com aspas é o símbolo gráfico do zero (o número 48 na tabela ASCII). O zero sem aspas é o caractere 'Null', que é invisível.",
            code: "#include <unistd.h>\n\nvoid\tft_print_numbers(void)\n{\n\tchar\tc;\n\n\tc = '0';\n\twhile (c <= '9')\n\t{\n\t\twrite(1, &c, 1);\n\t\tc++;\n\t}\n}",
            testCode: "void\tft_print_numbers(void);\n\nint\tmain(void)\n{\n\tft_print_numbers();\n\treturn (0);\n}",
            expl: {
                6: ["c = '0' ➔ Guardamos o SÍMBOLO do zero. (Valor ASCII: 48)."],
                7: ["while (c <= '9') ➔ Vamos até ao SÍMBOLO do nove. (Valor ASCII: 57)."],
                10: ["c++ ➔ Saltamos para o próximo símbolo gráfico."]
            },
            deepDive: [
                {
                    title: "1. Números vs Caracteres",
                    text: "O terminal é uma máquina de escrever burra. Ele só entende texto. Se lhe mandares um número inteiro (ex: 5), ele não sabe desenhar um '5'. Ele vai procurar o caractere invisível que está na posição 5 da tabela ASCII. Mandamos '0' (48) para ele desenhar um 0."
                }
            ]
        },
        ex04: {
            name: "ft_is_negative",
            context: "Dizer se um número é Positivo ou Negativo.",
            importance: "Introduz a instrução condicional `if / else` (Se / Senão). Ensina o programa a tomar decisões.",
            examTip: "Zero é considerado positivo neste exercício. Se o número for menor que 0, escreves 'N'. Para todos os outros casos (zero e cima), escreves 'P'.",
            code: "#include <unistd.h>\n\nvoid\tft_is_negative(int n)\n{\n\tif (n < 0)\n\t\twrite(1, \"N\", 1);\n\telse\n\t\twrite(1, \"P\", 1);\n}",
            testCode: "void\tft_is_negative(int n);\n\nint\tmain(void)\n{\n\tft_is_negative(-5);\n\tft_is_negative(0);\n\tft_is_negative(42);\n\treturn (0);\n}",
            expl: {
                4: ["if (n < 0) ➔ O computador verifica: Este número é negativo?"],
                5: ["write(1, \"N\", 1) ➔ Se a resposta for SIM, entra aqui e imprime N."],
                6: ["else ➔ Se a resposta for NÃO (ou seja, é 0 ou maior)."],
                7: ["write(1, \"P\", 1) ➔ Entra neste caminho alternativo e imprime P."]
            },
            deepDive: [
                {
                    title: "1. Escrever Letras Direto no Write",
                    text: "Repara que usámos aspas duplas `\"N\"` e não usámos o `&`. Em C, um texto com aspas duplas (String) já é um endereço de memória por natureza. O compilador resolve isso sozinho, por isso escusamos de criar uma variável char."
                }
            ]
        },
        ex05: {
            name: "ft_print_comb",
            context: "Imprimir 3 dígitos crescentes e diferentes (ex: 012, 013... 789).",
            importance: "Ensina a usar ciclos dentro de ciclos (Nested Loops). Para que os números não se repitam nem troquem a ordem, o 2º número tem de ser sempre maior que o 1º.",
            examTip: "O segredo está em ancorar as variáveis: `b = a + 1` garante que o segundo dígito nunca testa números antigos.",
            code: "#include <unistd.h>\n\nvoid\tft_print_comb(void)\n{\n\tchar\ta;\n\tchar\tb;\n\tchar\tc;\n\n\ta = '0';\n\twhile (a <= '7')\n\t{\n\t\tb = a + 1;\n\t\twhile (b <= '8')\n\t\t{\n\t\t\tc = b + 1;\n\t\t\twhile (c <= '9')\n\t\t\t{\n\t\t\t\twrite(1, &a, 1);\n\t\t\t\twrite(1, &b, 1);\n\t\t\t\twrite(1, &c, 1);\n\t\t\t\tif (!(a == '7' && b == '8' && c == '9'))\n\t\t\t\t\twrite(1, \", \", 2);\n\t\t\t\tc++;\n\t\t\t}\n\t\t\tb++;\n\t\t}\n\t\ta++;\n\t}\n}",
            testCode: "void\tft_print_comb(void);\n\nint\tmain(void)\n{\n\tft_print_comb();\n\treturn (0);\n}",
            expl: {
                8: ["a <= '7' ➔ O primeiro dígito só pode ir até ao 7. Se fosse 8, o 2º seria 9 e o 3º já não cabia."],
                11: ["b = a + 1 ➔ A regra de ouro. O 'b' começa sempre um número acima do 'a'. Evita permutações."],
                14: ["c = b + 1 ➔ O terceiro dígito começa sempre acima do segundo."],
                21: ["if (!(a=='7' && b=='8' && c=='9')) ➔ Se NÃO for a última combinação de todas, imprime vírgula e espaço."]
            },
            deepDive: [
                {
                    title: "1. A Lógica Crescente (A Âncora)",
                    text: "A condição `b = a + 1` garante que nunca temos combinações repetidas. Ao obrigar o próximo número a ser maior que o anterior, apagamos magicamente cenários inválidos como 021."
                }
            ]
        },
        ex06: {
            name: "ft_print_comb2",
            context: "Combinações de DOIS números de DOIS dígitos (ex: 00 01, 00 02 ... 98 99).",
            importance: "Mistura ciclos com a matemática mágica do C: A Divisão Inteira (`/`) e o Resto da Divisão (`%`).",
            examTip: "Um número do tipo 'int' não se pode imprimir com `write` direto. Mas a matemática resolve: Para o número 42, fazemos `42 / 10 = 4` (Dezena) e `42 % 10 = 2` (Unidade).",
            code: "#include <unistd.h>\n\nvoid\tft_putchar(char c)\n{\n\twrite(1, &c, 1);\n}\n\nvoid\tft_print_comb2(void)\n{\n\tint\ta;\n\tint\tb;\n\n\ta = 0;\n\twhile (a <= 98)\n\t{\n\t\tb = a + 1;\n\t\twhile (b <= 99)\n\t\t{\n\t\t\tft_putchar((a / 10) + '0');\n\t\t\tft_putchar((a % 10) + '0');\n\t\t\tft_putchar(' ');\n\t\t\tft_putchar((b / 10) + '0');\n\t\t\tft_putchar((b % 10) + '0');\n\t\t\tif (!(a == 98 && b == 99))\n\t\t\t\twrite(1, \", \", 2);\n\t\t\tb++;\n\t\t}\n\t\ta++;\n\t}\n}",
            testCode: "void\tft_print_comb2(void);\n\nint\tmain(void)\n{\n\tft_print_comb2();\n\treturn (0);\n}",
            expl: {
                13: ["a = 0 ➔ Usamos números reais (ints) em vez de letras (chars) para facilitar os cálculos."],
                18: ["(a / 10) ➔ Corta a unidade e dá a Dezena. Depois, somamos '0' (48) para transformar o número em caractere."],
                19: ["(a % 10) ➔ Guarda apenas o que resta, ou seja, a Unidade. Ex: 42 % 10 dá 2."],
                24: ["if (!(a == 98 && b == 99)) ➔ Regra de vírgula igual ao exercício anterior, mas com o teto de 98 99."]
            },
            deepDive: [
                {
                    title: "1. O Segredo de Somar '0'",
                    text: "Quando fazes `42 / 10`, o C dá-te o número 4. O write não sabe imprimir o número 4. Mas se a esse 4 tu somares o símbolo '0' (que vale 48 na tabela ASCII), ficas com 52. Na tabela ASCII, 52 é o símbolo gráfico do '4'. É um truque perfeito."
                }
            ]
        },
        ex07: {
            name: "ft_putnbr",
            context: "Imprimir qualquer número (até negativo e enorme) no ecrã.",
            importance: "Introduz a RECURSIVIDADE. A função chamar-se a si própria para dividir um número grande em pedaços pequenos.",
            examTip: "O número mais baixo possível no C é -2147483648. Se tentares multiplicar isso por -1 para o tornar positivo, o programa estoira (Overflow). Por isso, convertemos o número primeiro para uma variável 'long' (que tem mais espaço de memória).",
            code: "#include <unistd.h>\n\nvoid\tft_putchar(char c)\n{\n\twrite(1, &c, 1);\n}\n\nvoid\tft_putnbr(int nb)\n{\n\tlong\tn;\n\n\tn = nb;\n\tif (n < 0)\n\t{\n\t\tft_putchar('-');\n\t\tn = -n;\n\t}\n\tif (n > 9)\n\t{\n\t\tft_putnbr(n / 10);\n\t\tft_putnbr(n % 10);\n\t}\n\telse\n\t\tft_putchar(n + '0');\n}",
            testCode: "void\tft_putnbr(int nb);\nvoid\tft_putchar(char c);\n\nint\tmain(void)\n{\n\tft_putnbr(42);\n\tft_putchar('\\n');\n\tft_putnbr(-2147483648);\n\treturn (0);\n}",
            expl: {
                9: ["long n ➔ Variável enorme. Serve de proteção contra o tamanho gigantesco do número negativo máximo."],
                13: ["if (n < 0) ➔ Se for negativo, imprimimos um travessão '-' no ecrã e tornamos o 'n' positivo."],
                18: ["if (n > 9) ➔ O número tem 2 ou mais dígitos? Se sim, temos de o partir."],
                20: ["ft_putnbr(n / 10) ➔ RECURSÃO: 'Manda este número dividido por 10 para uma nova função igualzinha a mim'."],
                21: ["ft_putnbr(n % 10) ➔ No caminho de volta, manda imprimir os restos (o último dígito)."]
            },
            deepDive: [
                {
                    title: "1. A Magia do Empilhamento (Recursão)",
                    text: "Se tentares imprimir 42, o programa vai chamar ft_putnbr(42). Vê que é maior que 9. Chama ft_putnbr(4). O 4 é impresso. Depois o programa volta atrás e faz ft_putnbr(42 % 10), que imprime o 2. Ele lê os números da esquerda para a direita partindo-os."
                }
            ]
        },
        ex08: {
            name: "ft_print_combn",
            context: "Imprimir todas as combinações de 'n' dígitos (ex: se n=2, imprime 01, 02... 89).",
            importance: "O Boss do C00. Como o número de dígitos varia, não podemos usar `while` fixos como no ex05. Usamos Recursão e um Array (lista) para ir guardando os números.",
            examTip: "A função principal só arranca se `n` for entre 1 e 9. A função auxiliar (`gen`) é que faz o trabalho sujo, preenchendo a lista e chamando-se a si mesma.",
            code: "#include <unistd.h>\n\nvoid\tft_putchar(char c)\n{\n\twrite(1, &c, 1);\n}\n\nvoid\tprint_arr(int *arr, int n)\n{\n\tint\ti;\n\n\ti = 0;\n\twhile (i < n)\n\t\tft_putchar(arr[i++] + '0');\n\tif (arr[0] != 10 - n)\n\t\twrite(1, \", \", 2);\n}\n\nvoid\tgen(int *arr, int n, int pos, int start)\n{\n\tint\ti;\n\n\ti = start;\n\tif (pos == n)\n\t{\n\t\tprint_arr(arr, n);\n\t\treturn ;\n\t}\n\twhile (i <= 9)\n\t{\n\t\tarr[pos] = i;\n\t\tgen(arr, n, pos + 1, i + 1);\n\t\ti++;\n\t}\n}\n\nvoid\tft_print_combn(int n)\n{\n\tint\tarr[10];\n\n\tif (n > 0 && n < 10)\n\t\tgen(arr, n, 0, 0);\n}",
            testCode: "void\tft_print_combn(int n);\n\nint\tmain(void)\n{\n\tft_print_combn(2);\n\treturn (0);\n}",
            expl: {
                14: ["arr[0] != 10 - n ➔ O truque da vírgula. Se n=2, a última combinação é 89. O primeiro número é 8 (que é 10 - 2). Se o primeiro número não for esse, imprime a vírgula."],
                23: ["pos == n ➔ Caso Base. Se a posição atual for igual ao limite de dígitos, a lista está cheia. Imprime a lista e volta para trás (return)."],
                30: ["arr[pos] = i ➔ Coloca o número atual na nossa lista (array)."],
                31: ["gen(arr, n, pos + 1, i + 1) ➔ Chama a si mesma para preencher a PRÓXIMA posição (`pos + 1`), obrigando o número a ser maior (`i + 1`)."]
            },
            deepDive: [
                {
                    title: "1. O Array como Rascunho",
                    text: "Criamos um array de 10 posições (`int arr[10]`). A função `gen` vai andando por este array. Quando o array tiver a quantidade certa de números (`pos == n`), ela chama a função `print_arr` para imprimir."
                },
                {
                    title: "2. Backtracking (Voltar Atrás)",
                    text: "Quando a lista imprime (ex: 01), a função faz `return` e volta um passo atrás. O ciclo continua, o `i` aumenta para 2, e ela substitui a última posição (fica 02). Isto repete-se até fazer todas as combinações sem precisares de escrever 9 ciclos `while` à mão."
                }
            ]
        }
    },
    c01: {
        ex00: {
            name: "ft_ft",
            context: "Alterar o valor de uma variável que está noutra função.",
            importance: "No C, se passarmos uma variável normal para uma função, ele apenas envia uma 'cópia'. As alterações perdem-se. Para mudar o valor original, temos de usar 'Ponteiros'.",
            examTip: "O asterisco `*` tem dois papéis: Na declaração (`int *nbr`) diz que vai receber um endereço. Na execução (`*nbr = 42`) significa 'vai a este endereço e altera o que lá está'.",
            code: "void\tft_ft(int *nbr)\n{\n\t*nbr = 42;\n}",
            testCode: "#include <stdio.h>\nvoid\tft_ft(int *nbr);\n\nint\tmain(void)\n{\n\tint a;\n\n\ta = 10;\n\tft_ft(&a);\n\tprintf(\"%d\\n\", a); // Vai imprimir 42\n\treturn (0);\n}",
            expl: {
                0: [
                    "int * ➔ O asterisco diz que a função recebe o 'endereço' (o local na memória) de um número inteiro."
                ],
                2: [
                    "*nbr ➔ 'Abre a caixa que está neste endereço...'",
                    "= 42 ➔ '...e coloca lá dentro o número 42'."
                ]
            },
            deepDive: [
                {
                    title: "1. O Problema das Cópias",
                    text: "Imagina `int a = 10` na função main. Se chamasses `ft_ft(a)`, a função recebia uma cópia do 10. Se mudasse para 42, só mudava a cópia. O 'a' do main continuava a ser 10."
                },
                {
                    title: "2. A Solução: Dar a Morada",
                    text: "Em vez do valor, enviamos a morada de memória onde o 'a' mora (passando `&a` no main). Ao fazer `*nbr = 42`, o programa viaja até essa morada e efetua a troca permanentemente."
                }
            ]
        },
        ex01: {
            name: "ft_ultimate_ft",
            context: "Alterar um valor usando uma corrente de ponteiros gigantesca (9 níveis).",
            importance: "Mostra que a memória funciona em cadeia. Podes ter uma variável que guarda a morada de uma variável, que guarda a morada de outra, etc.",
            examTip: "Para chegar ao valor final, precisas de colocar exatamente o mesmo número de asteriscos que estão na declaração da função para 'desempacotar' tudo.",
            code: "void\tft_ultimate_ft(int *********nbr)\n{\n\t*********nbr = 42;\n}",
            testCode: "#include <stdio.h>\nvoid\tft_ultimate_ft(int *********nbr);\n\nint\tmain(void)\n{\n\tint a = 10;\n\tint *p1 = &a;\n\tint **p2 = &p1;\n\tint ***p3 = &p2;\n\tint ****p4 = &p3;\n\tint *****p5 = &p4;\n\tint ******p6 = &p5;\n\tint *******p7 = &p6;\n\tint ********p8 = &p7;\n\tint *********p9 = &p8;\n\tft_ultimate_ft(p9);\n\tprintf(\"%d\\n\", a);\n\treturn (0);\n}",
            expl: {
                0: ["*********nbr ➔ Declaração que avisa: 'Vou receber um ponteiro que aponta para outro ponteiro... 9 vezes'."],
                2: ["*********nbr = 42 ➔ Cada asterisco 'abre uma porta'. Ao usar 9, chegamos ao número final e trocamos por 42."]
            },
            deepDive: [
                {
                    title: "1. O Mapa do Mapa",
                    text: "Imagina que procuras um tesouro (o número). O primeiro papel não tem o tesouro, tem um mapa para outra caixa. Abres essa caixa e tem outro mapa. Fazes isto 9 vezes. O `*********` é o comando que diz ao C para abrir automaticamente essas 9 caixas seguidas."
                }
            ]
        },
        ex02: {
            name: "ft_swap",
            context: "Trocar os valores entre duas variáveis diferentes usando as suas moradas.",
            importance: "Lógica base para organizar listas (como ordenar números do mais pequeno para o maior).",
            examTip: "Para trocar duas coisas de lugar na programação, precisas sempre de um 'copo vazio' (uma variável temporária). Se deitares o valor de A para o B diretamente, perdes o valor antigo do B para sempre.",
            code: "void\tft_swap(int *a, int *b)\n{\n\tint\ttmp;\n\n\ttmp = *a;\n\t*a = *b;\n\t*b = tmp;\n}",
            testCode: "#include <stdio.h>\nvoid\tft_swap(int *a, int *b);\n\nint\tmain(void)\n{\n\tint a = 1;\n\tint b = 2;\n\tft_swap(&a, &b);\n\tprintf(\"a:%d b:%d\\n\", a, b);\n\treturn (0);\n}",
            expl: {
                2: ["int tmp ➔ A variável temporária (o copo vazio) para guardar coisas sem perder informação."],
                4: ["tmp = *a ➔ Passo 1: Lemos o valor que está na morada A e guardamos no tmp (backup)."],
                5: ["*a = *b ➔ Passo 2: Copiamos o valor de B para a morada A. O valor de A apagou-se, mas está seguro no tmp."],
                6: ["*b = tmp ➔ Passo 3: Colocamos o valor antigo de A (o backup) na morada B."]
            },
            deepDive: [
                {
                    title: "1. Variáveis Normais vs Ponteiros",
                    text: "Repara que `tmp` não tem asterisco (`int tmp`). Porque o `tmp` é só para guardar o número (o valor normal, ex: 10), e não para guardar uma morada de memória."
                }
            ]
        },
        ex03: {
            name: "ft_div_mod",
            context: "Fazer uma divisão e devolver o resultado e o resto ao mesmo tempo.",
            importance: "No C, uma função só pode dar um único 'return'. Se quisermos devolver dois resultados, enviamos duas moradas para a função preencher remotamente.",
            examTip: "Neste exercício, `a` e `b` são apenas números (cópias) porque só precisamos de os ler. `div` e `mod` são ponteiros (moradas) porque precisamos de escrever neles.",
            code: "void\tft_div_mod(int a, int b, int *div, int *mod)\n{\n\tif (b != 0)\n\t{\n\t\t*div = a / b;\n\t\t*mod = a % b;\n\t}\n}",
            testCode: "#include <stdio.h>\nvoid\tft_div_mod(int a, int b, int *div, int *mod);\n\nint\tmain(void)\n{\n\tint d, m;\n\tft_div_mod(10, 3, &d, &m);\n\tprintf(\"Div:%d Mod:%d\\n\", d, m);\n\treturn (0);\n}",
            expl: {
                2: ["if (b != 0) ➔ Regra matemática de ouro: É impossível dividir algo por zero. Se acontecer, o programa estoira."],
                4: ["*div = a / b ➔ Coloca o resultado da divisão na morada guardada em 'div'."],
                5: ["*mod = a % b ➔ Coloca o resto da divisão na morada guardada em 'mod'."]
            },
            deepDive: [
                {
                    title: "1. O Poder dos Ponteiros como Saídas",
                    text: "Isto contorna a limitação de uma função não poder fazer múltiplos 'return'. O main envia-te as variáveis dele em branco, e tu preenches os valores lá dentro remotamente."
                }
            ]
        },
        ex04: {
            name: "ft_ultimate_div_mod",
            context: "Fazer divisão e o resto, mas guardando os resultados nas PRÓPRIAS variáveis originais.",
            importance: "Ensina o perigo de alterar variáveis cedo demais. Se alterares o `a` primeiro, a conta do `b` vai usar o novo valor de `a` e a matemática fica toda estragada.",
            examTip: "Guarda sempre as versões originais num 'cofre' (variáveis tmp) antes de fazeres qualquer cálculo de substituição.",
            code: "void\tft_ultimate_div_mod(int *a, int *b)\n{\n\tint\ttmp_a;\n\tint\ttmp_b;\n\n\tif (*b != 0)\n\t{\n\t\ttmp_a = *a;\n\t\ttmp_b = *b;\n\t\t*a = tmp_a / tmp_b;\n\t\t*b = tmp_a % tmp_b;\n\t}\n}",
            testCode: "#include <stdio.h>\nvoid\tft_ultimate_div_mod(int *a, int *b);\n\nint\tmain(void)\n{\n\tint x = 10;\n\tint y = 3;\n\tft_ultimate_div_mod(&x, &y);\n\tprintf(\"Div:%d Mod:%d\\n\", x, y);\n\treturn (0);\n}",
            expl: {
                8: ["tmp_a = *a ➔ Guardamos os valores originais. (Snapshot)."],
                10: ["*a = tmp_a / tmp_b ➔ O `*a` original morre aqui, mas não faz mal porque temos o `tmp_a`."],
                11: ["*b = tmp_a % tmp_b ➔ Calculamos o resto de forma segura usando o `tmp_a` (que ainda tem o valor intocado)."]
            },
            deepDive: [
                {
                    title: "1. O Erro Comum",
                    text: "Se fizesses diretamente `*a = *a / *b`, o A mudava logo. Na linha seguinte, faríamos `*b = *a % *b`. O programa usaria o novo quociente como se fosse o número original. Ao congelar o estado em `tmp_a` e `tmp_b`, isolamos a matemática da corrupção."
                }
            ]
        },
        ex05: {
            name: "ft_putstr",
            context: "Imprimir uma palavra completa (uma String).",
            importance: "Ensina como as palavras funcionam em C. Uma palavra é apenas uma lista (Array) de letras seguidas, onde a última letra invisível é sempre o Terminador Nulo (`\\0`).",
            examTip: "Não precisas de saber o tamanho da palavra. Basta usares um ciclo e mandares imprimir letra a letra até o programa chocar de frente com o `'\\0'`. Quando encontrar o '\\0', a palavra acabou.",
            code: "#include <unistd.h>\n\nvoid\tft_putstr(char *str)\n{\n\tint\ti;\n\n\ti = 0;\n\twhile (str[i] != '\\0')\n\t{\n\t\twrite(1, &str[i], 1);\n\t\ti++;\n\t}\n}",
            testCode: "void\tft_putstr(char *str);\n\nint\tmain(void)\n{\n\tft_putstr(\"Ola 42!\");\n\treturn (0);\n}",
            expl: {
                0: ["char *str ➔ Uma String em C é na verdade um ponteiro que aponta para a primeira letra da palavra."],
                6: ["i = 0 ➔ O nosso índice (o dedo que aponta para qual letra estamos a ler)."],
                7: ["str[i] != '\\0' ➔ O ciclo: 'Lê a letra. Se ela não for o caractere fantasma de fim (Nulo), avança'."],
                9: ["&str[i] ➔ O write exige o endereço. Pedimos o endereço exato da letra que está na posição 'i'."]
            },
            deepDive: [
                {
                    title: "1. O Caractere Nulo",
                    text: "Se esqueceres de testar `!= '\\0'`, o teu ciclo vai continuar a ler a memória depois de a palavra acabar. Vai imprimir milhares de caracteres de lixo, códigos bizarros, e eventualmente o sistema vai matar o teu programa."
                }
            ]
        },
        ex06: {
            name: "ft_strlen",
            context: "Contar quantas letras tem uma palavra.",
            importance: "Exatamente a mesma lógica de imprimir uma string, mas em vez de imprimires, apenas adicionas +1 a um contador.",
            examTip: "O tamanho da palavra NUNCA inclui o caractere `'\\0'`. Se tens 'Olá' seguida de '\\0', o tamanho devolvido tem de ser 3.",
            code: "int\tft_strlen(char *str)\n{\n\tint\ti;\n\n\ti = 0;\n\twhile (str[i] != '\\0')\n\t{\n\t\ti++;\n\t}\n\treturn (i);\n}",
            testCode: "#include <stdio.h>\nint\tft_strlen(char *str);\n\nint\tmain(void)\n{\n\tprintf(\"Size: %d\\n\", ft_strlen(\"Ola 42\"));\n\treturn (0);\n}",
            expl: {
                0: ["int ➔ Desta vez, a função devolve um valor inteiro para o programa principal (o tamanho)."],
                7: ["while (str[i] != '\\0') ➔ Enquanto não bater na parede de fim da palavra..."],
                9: ["i++ ➔ ...Soma 1 à contagem."],
                11: ["return (i) ➔ No fim, devolve a contagem total. O Nulo não é contado porque o ciclo abortou antes."]
            },
            deepDive: [
                {
                    title: "1. A Simplicidade",
                    text: "A nossa variável `i` serve de dois propósitos incríveis: É o 'dedo' que navega na lista de letras (`str[i]`), e ao mesmo tempo é a matemática que conta as letras (ao chegar ao fim, `i` será o total exato)."
                }
            ]
        },
        ex07: {
            name: "ft_rev_int_tab",
            context: "Inverter a ordem de uma lista de números.",
            importance: "Ensina a manipular listas. Precisamos de trocar o primeiro com o último, o segundo com o penúltimo, etc.",
            examTip: "A regra de ouro: O ciclo SÓ PODE IR ATÉ METADE DA LISTA (`size / 2`). Se o ciclo for até ao fim, vais trocar os números, e depois na segunda metade vais destrocá-los, voltando tudo ao início.",
            code: "void\tft_rev_int_tab(int *tab, int size)\n{\n\tint\ti;\n\tint\ttmp;\n\n\ti = 0;\n\twhile (i < size / 2)\n\t{\n\t\ttmp = tab[i];\n\t\ttab[i] = tab[size - 1 - i];\n\t\ttab[size - 1 - i] = tmp;\n\t\ti++;\n\t}\n}",
            testCode: "#include <stdio.h>\nvoid\tft_rev_int_tab(int *tab, int size);\n\nint\tmain(void)\n{\n\tint tab[5] = {1, 2, 3, 4, 5};\n\tft_rev_int_tab(tab, 5);\n\tprintf(\"%d %d %d\\n\", tab[0], tab[1], tab[4]); // 5 4 1\n\treturn (0);\n}",
            expl: {
                7: ["size / 2 ➔ Paramos no meio. Se a lista tiver 5 coisas, paramos no item 2."],
                9: ["tmp = tab[i] ➔ Passo 1 do Swap: Guardar o número da frente no cofre."],
                10: ["tab[size - 1 - i] ➔ O truque para achar o par nas traseiras da lista (Último, Penúltimo, etc)."],
                11: ["tab[...] = tmp ➔ Passo 3: Colocar o valor que estava à frente, lá para trás."]
            },
            deepDive: [
                {
                    title: "1. A Matemática Traseira",
                    text: "Se a lista tem 5 itens (size=5), as posições são 0, 1, 2, 3, 4. Para o `i=0`, queremos o parceiro `4`. Fazemos `size - 1 - i` (5 - 1 - 0 = 4). No passo seguinte, com `i=1`, o parceiro é `5 - 1 - 1 = 3`. A matemática fecha-se perfeitamente!"
                }
            ]
        },
        ex08: {
            name: "ft_sort_int_tab",
            context: "Ordenar uma lista de números do menor para o maior.",
            importance: "O clássico 'Bubble Sort'. Ensina a usar um ciclo dentro de outro ciclo, comparando vizinhos. Se o vizinho da esquerda for maior que o da direita, eles trocam de lugar.",
            examTip: "Precisamos de uma variável 'swapped' (bandeira). Se percorrermos a lista toda e não houver nenhuma troca, significa que já está ordenado e podemos parar o ciclo principal.",
            code: "void\tft_sort_int_tab(int *tab, int size)\n{\n\tint\ti;\n\tint\ttmp;\n\tint\tswapped;\n\n\tswapped = 1;\n\twhile (swapped == 1)\n\t{\n\t\tswapped = 0;\n\t\ti = 0;\n\t\twhile (i < size - 1)\n\t\t{\n\t\t\tif (tab[i] > tab[i + 1])\n\t\t\t{\n\t\t\t\ttmp = tab[i];\n\t\t\t\ttab[i] = tab[i + 1];\n\t\t\t\ttab[i + 1] = tmp;\n\t\t\t\tswapped = 1;\n\t\t\t}\n\t\t\ti++;\n\t\t}\n\t}\n}",
            testCode: "#include <stdio.h>\nvoid\tft_sort_int_tab(int *tab, int size);\n\nint\tmain(void)\n{\n\tint tab[4] = {4, 1, 3, 2};\n\tft_sort_int_tab(tab, 4);\n\tprintf(\"%d %d %d %d\\n\", tab[0], tab[1], tab[2], tab[3]);\n\treturn (0);\n}",
            expl: {
                7: ["swapped = 1 ➔ Força o ciclo principal a começar."],
                10: ["swapped = 0 ➔ A meio caminho, fingimos que a lista já está ordenada."],
                12: ["i < size - 1 ➔ Paramos na PENÚLTIMA posição, porque o if vai sempre olhar para o vizinho da frente `[i + 1]`. Se fôssemos até à última posição, leríamos lixo de memória."],
                14: ["tab[i] > tab[i + 1] ➔ O vizinho da esquerda é maior que o da direita? Se sim, temos de trocar."],
                19: ["swapped = 1 ➔ Houve uma troca! Avisa o ciclo principal que ele tem de dar mais uma volta para ter a certeza que está tudo bem."]
            },
            deepDive: [
                {
                    title: "1. A Bandeira (Flag)",
                    text: "Imagina uma fila de alunos. Tu mandas trocarem de lugar se estiverem fora de ordem. Se passares pela fila inteira e não deres NENHUMA ordem de troca (`swapped` continua a 0), significa que a fila está perfeita e podes ir para casa."
                }
            ]
        }
    }
};

// ==========================================
// 2. COMPONENTES: TABELA ASCII E TIMELINE (DEEP DIVE)
// ==========================================

const AsciiTable = () => {
    const asciiData = Array.from({ length: 95 }, (_, i) => i + 32);

    const getCategory = (dec) => {
        if (dec >= 48 && dec <= 57) return { name: "Números", color: "text-amber-500", border: "border-amber-200", bg: "bg-amber-50" };
        if (dec >= 65 && dec <= 90) return { name: "Maiúsculas", color: "text-blue-500", border: "border-blue-200", bg: "bg-blue-50" };
        if (dec >= 97 && dec <= 122) return { name: "Minúsculas", color: "text-emerald-500", border: "border-emerald-200", bg: "bg-emerald-50" };
        return { name: "Símbolos", color: "text-slate-500", border: "border-slate-200", bg: "bg-white" };
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Hash className="text-indigo-600" /> Tabela de Conversão ASCII
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">É assim que o computador entende as letras: converte tudo para números.</p>
                </div>

                <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded">NULL = 0</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded">Números [48-57]</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded">Maiúsculas [65-90]</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded">Minúsculas [97-122]</span>
                </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="p-2 rounded-lg border bg-slate-100 border-slate-300 flex flex-col items-center justify-center">
                    <div className="text-[10px] text-slate-500 font-mono mb-1">D:0</div>
                    <div className="text-lg font-bold text-slate-700">\0</div>
                </div>

                {asciiData.map((dec) => {
                    const char = String.fromCharCode(dec);
                    const category = getCategory(dec);
                    return (
                        <div key={dec} className={`p-2 rounded-lg border flex flex-col items-center justify-center hover:shadow-md transition-shadow ${category.bg} ${category.border}`}>
                            <div className="text-[10px] text-slate-500 font-mono mb-1 w-full text-center">
                                D:{dec}
                            </div>
                            <div className={`text-lg font-bold my-1 ${category.color}`}>
                                {dec === 32 ? 'SPC' : char}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ExplainTimeline = ({ steps }) => {
    if (!steps || steps.length === 0) return null;
    return (
        <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-md font-bold text-indigo-900 flex items-center gap-2 mb-6">
                <Users className="text-indigo-600" size={20} /> Como Explicar na Avaliação (A Lógica)
            </h3>
            <div className="space-y-4">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold shrink-0">
                            {idx + 1}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm mb-1">{step.title}</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{step.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CodeViewer = ({ code, explanation }) => {
    if (!code) return null;
    return (
        <div className="bg-slate-900 rounded-xl p-4 md:p-6 font-mono text-[13px] overflow-x-auto border border-slate-800 my-6 shadow-md" style={{ tabSize: 4 }}>
            {code.split('\n').map((line, i) => {
                const hasExpl = explanation && explanation[i];
                const explArray = hasExpl ? (Array.isArray(explanation[i]) ? explanation[i] : [explanation[i]]) : [];

                return (
                    <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-8 group hover:bg-slate-800/50 w-full min-w-max py-1.5 transition-colors rounded px-2">
                        <div className="flex shrink-0 w-max items-center">
                            <span className="text-slate-500 w-6 text-right select-none pr-3 shrink-0 text-xs">{i + 1}</span>
                            <span className="whitespace-pre pl-2 text-indigo-300 font-medium">{line}</span>
                        </div>

                        {hasExpl && (
                            <div className="flex flex-col gap-1.5 pt-1 lg:pt-0 pl-8 lg:pl-0 lg:border-l lg:border-slate-700 lg:ml-4 lg:pl-4 w-full">
                                {explArray.map((explLine, idx) => {
                                    const parts = typeof explLine === 'string' ? explLine.split('➔') : [String(explLine)];
                                    if (parts.length > 1) {
                                        return (
                                            <div key={idx} className="flex items-start gap-2 w-full">
                                                <span className="text-emerald-400 font-bold mt-px shrink-0"><ChevronRight size={14}/></span>
                                                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full">
                          <span className="text-emerald-300 font-bold bg-emerald-900/40 px-2 rounded text-xs shrink-0 h-fit w-fit">
                            {parts[0].trim()}
                          </span>
                                                    <span className="text-slate-300 text-xs md:text-sm leading-relaxed">
                            {parts[1].trim()}
                          </span>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={idx} className="flex items-start gap-2">
                                            <span className="text-emerald-400 font-bold mt-px shrink-0"><ChevronRight size={14}/></span>
                                            <span className="text-slate-300 text-xs md:text-sm leading-relaxed">{explLine}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

// ==========================================
// COMPONENTE: TESTE, GIT E PLAIN TEXT
// ==========================================
const TestAndSubmit = ({ exerciseName, testCode, fullExerciseData }) => {
    const [copiedText, setCopiedText] = useState(false);
    const fileName = `${exerciseName}.c`;

    // Gerador de Plain Text para o Bloco de Notas
    const generatePlainText = () => {
        let plain = `========================================\n`;
        plain += `EXERCÍCIO: ${exerciseName}\n`;
        plain += `========================================\n\n`;

        plain += `>> O QUE FAZ:\n`;
        plain += `${fullExerciseData.context}\n\n`;

        plain += `>> DICA DE SOBREVIVÊNCIA:\n`;
        plain += `${fullExerciseData.examTip}\n\n`;

        plain += `>> O CÓDIGO:\n`;
        plain += `${fullExerciseData.code}\n\n`;

        if (fullExerciseData.deepDive) {
            plain += `>> COMO EXPLICAR (A LÓGICA):\n`;
            fullExerciseData.deepDive.forEach((step, idx) => {
                plain += `${idx + 1}. ${step.title}\n`;
                plain += `   ${step.text}\n\n`;
            });
        }

        plain += `>> FLUXO DE ENTREGA (TERMINAL):\n`;
        plain += `1. norminette -R CheckForbiddenSourceHeader ${fileName}\n`;
        plain += `2. cc -Wall -Wextra -Werror main.c ${fileName}\n`;
        plain += `3. ./a.out\n`;
        plain += `4. rm main.c a.out\n`;
        plain += `5. git add ${fileName}\n`;
        plain += `6. git commit -m "feat: entregando ${exerciseName}"\n`;
        plain += `7. git push\n`;

        return plain;
    };

    const handleCopy = () => {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = generatePlainText();
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            setCopiedText(true);
            setTimeout(() => setCopiedText(false), 2000);
            document.body.removeChild(textArea);
        } catch (err) {
            console.error('Falha de cópia', err);
        }
    };

    return (
        <div className="mt-12 pt-8 border-t-2 border-slate-200">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-6 uppercase">
                <PlaySquare className="text-indigo-600" size={24} /> Zona de Teste e Entrega
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                {/* ARQUIVO MAIN.C */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-200/50 px-4 py-2 border-b border-slate-200 flex items-center gap-2 font-mono text-xs text-slate-600 font-bold">
                        <FileText size={14} /> main.c
                    </div>
                    <div className="p-4 bg-slate-900 text-slate-300 font-mono text-xs overflow-x-auto whitespace-pre" style={{ tabSize: 4 }}>
                        {testCode || "// Nenhum teste disponível para este exercício."}
                    </div>
                </div>

                {/* TERMINAL DE ENTREGA */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-200/50 px-4 py-2 border-b border-slate-200 flex items-center gap-2 font-mono text-xs text-slate-600 font-bold">
                        <Terminal size={14} /> Terminal (O Fluxo Obrigatório)
                    </div>
                    <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre space-y-2">
                        <div><span className="text-slate-500">$</span> norminette -R CheckForbiddenSourceHeader {fileName}</div>
                        <div><span className="text-slate-500">$</span> cc -Wall -Wextra -Werror main.c {fileName}</div>
                        <div><span className="text-slate-500">$</span> ./a.out</div>
                        <div className="text-slate-400 italic"># Se tudo estiver perfeito, LIMPA O LIXO ANTES DO GIT!</div>
                        <div className="bg-rose-950/40 text-rose-400 p-1.5 border border-rose-900/50 rounded inline-block"><span className="text-slate-500">$</span> rm main.c a.out</div>
                        <div><span className="text-slate-500">$</span> git add {fileName}</div>
                        <div><span className="text-slate-500">$</span> git commit -m "feat: done {exerciseName}"</div>
                        <div><span className="text-slate-500">$</span> git push</div>
                    </div>
                </div>
            </div>

            {/* BLOCO DE NOTAS (PLAIN TEXT) */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
                        <Copy size={16} className="text-indigo-600" /> Bloco de Notas (Plain Text)
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded-md text-xs font-bold transition-colors"
                    >
                        {copiedText ? <CheckCircle size={14} /> : <Copy size={14} />}
                        {copiedText ? 'Copiado!' : 'Copiar Tudo'}
                    </button>
                </div>
                <textarea
                    readOnly
                    value={generatePlainText()}
                    className="w-full h-48 p-4 text-xs font-mono text-slate-600 bg-slate-50/50 focus:outline-none resize-y"
                />
            </div>
        </div>
    );
};

// ==========================================
// 3. ESTRUTURA PRINCIPAL
// ==========================================

export default function App() {
    const [activeTab, setActiveTab] = useState('c00');
    const [selectedEx, setSelectedEx] = useState('ex00');

    const currentModule = modulesData[activeTab];
    const safeSelectedEx = currentModule && currentModule[selectedEx] ? selectedEx : 'ex00';
    const currentEx = currentModule ? currentModule[safeSelectedEx] : null;

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'c00' || tab === 'c01') setSelectedEx('ex00');
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8 overflow-y-auto w-full overflow-x-hidden">

            {/* HEADER */}
            <header className="max-w-6xl mx-auto mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center justify-center md:justify-start gap-3">
                        <Laptop className="text-indigo-600" /> 42 PISCINE COMPANION
                    </h1>
                    <p className="text-slate-500 text-sm mt-2 font-medium">O teu guia de sobrevivência, peer-to-peer e lógica limpa.</p>
                </div>

                <div className="flex gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 overflow-x-auto w-full md:w-auto custom-scrollbar">
                    {['c00', 'c01', 'rush', 'git', 'man', 'ascii'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
                        >
                            {tab === 'rush' ? 'Rush 02' : tab === 'git' ? 'Fluxo Git' : tab === 'man' ? 'Man Pages' : tab === 'ascii' ? 'Tabela ASCII' : `Módulo ${tab.toUpperCase()}`}
                        </button>
                    ))}
                </div>
            </header>

            <main className="max-w-6xl mx-auto">

                {/* SECÇÃO MÓDULOS C */}
                {(activeTab === 'c00' || activeTab === 'c01') && currentEx && currentModule && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        <aside className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto pb-2 custom-scrollbar">
                            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider pl-2 mb-2 flex items-center gap-2">
                                <FolderPlus size={16} /> Lista {activeTab.toUpperCase()}
                            </h3>
                            {Object.keys(currentModule).map(ex => (
                                <button
                                    key={ex}
                                    onClick={() => setSelectedEx(ex)}
                                    className={`flex-shrink-0 w-36 lg:w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase transition-all border ${safeSelectedEx === ex ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{ex}</span>
                                        <ChevronRight size={14} className={`hidden lg:block ${safeSelectedEx === ex ? 'opacity-100' : 'opacity-0'}`} />
                                    </div>
                                </button>
                            ))}
                        </aside>

                        <div className="lg:col-span-9 bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm">
                            <div className="mb-6 flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-6">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 uppercase flex items-center gap-3">
                                        <Code2 className="text-indigo-600" size={24}/> {currentEx.name}
                                    </h2>
                                    <p className="text-slate-500 text-sm mt-2">{currentEx.context}</p>
                                </div>
                                <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-mono text-xs font-bold shrink-0 border border-indigo-100">
                                    {activeTab.toUpperCase()} / {safeSelectedEx.toUpperCase()}
                                </div>
                            </div>

                            <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-xl mb-6">
                                <h4 className="flex items-center gap-2 font-bold text-indigo-800 text-sm mb-2">
                                    <Lightbulb size={18} /> O Que Deves Entender (A Lógica)
                                </h4>
                                <p className="text-slate-700 text-sm leading-relaxed mb-4">{currentEx.importance}</p>

                                <div className="border-l-4 border-indigo-400 pl-4 bg-white p-3 rounded-r-lg shadow-sm">
                                    <p className="text-indigo-900 font-semibold text-xs mb-1">Dica de Sobrevivência:</p>
                                    <p className="text-slate-600 text-sm italic">{currentEx.examTip}</p>
                                </div>
                            </div>

                            <CodeViewer code={currentEx.code} explanation={currentEx.expl} />
                            <ExplainTimeline steps={currentEx.deepDive} />

                            {currentEx.questions && currentEx.questions.length > 0 && (
                                <div className="mt-8 bg-slate-50 border border-slate-200 p-6 rounded-xl">
                                    <h4 className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-4">
                                        <FileQuestion size={18} className="text-amber-500" /> Perguntas Comuns da Avaliação
                                    </h4>
                                    <div className="space-y-4">
                                        {currentEx.questions.map((q, i) => (
                                            <div key={i}>
                                                <p className="text-slate-700 font-bold text-sm mb-2">P: {q.q}</p>
                                                <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-600 text-sm shadow-sm flex gap-3 items-start">
                                                    <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                                    <p>{q.a}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* MÓDULO DE TESTE E PLAIN TEXT ACOPLADO A CADA EXERCÍCIO */}
                            <TestAndSubmit
                                exerciseName={currentEx.name}
                                testCode={currentEx.testCode}
                                fullExerciseData={currentEx}
                            />
                        </div>
                    </div>
                )}

                {/* SECÇÃO TABELA ASCII */}
                {activeTab === 'ascii' && <AsciiTable />}

                {/* SECÇÃO DO RUSH (LÓGICA DESCOMPLICADA) */}
                {activeTab === 'rush' && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-10 shadow-sm">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
                            <LayoutGrid className="text-indigo-600" size={32} /> A Lógica Visual do Rush 02
                        </h2>
                        <p className="text-slate-600 mb-8 leading-relaxed max-w-3xl">
                            O Rush pede-nos para desenhar um retângulo feito de letras. A melhor forma de pensar nisto é como uma grelha de coordenadas. O código varre a grelha da esquerda para a direita (colunas) e de cima para baixo (linhas). Quando encontra as posições corretas, imprime a letra correspondente.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                                <h3 className="font-bold text-indigo-800 text-lg mb-4 flex items-center gap-2">
                                    <Terminal size={20} /> O Código Base
                                </h3>
                                <div className="font-mono text-sm text-slate-700 space-y-3">
                                    <p className="text-emerald-600">// Esquinas de Cima (A)</p>
                                    <p>if ((col == 1 && row == 1) || (col == x && row == 1))</p>
                                    <br/>
                                    <p className="text-emerald-600">// Esquinas de Baixo (C)</p>
                                    <p>else if ((col == 1 && row == y) || (col == x && row == y))</p>
                                    <br/>
                                    <p className="text-emerald-600">// Paredes e Teto/Base (B)</p>
                                    <p>else if (col == 1 || col == x || row == 1 || row == y)</p>
                                    <br/>
                                    <p className="text-emerald-600">// Miolo vazio (Espaço)</p>
                                    <p>else print(' ')</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                                    <h4 className="font-bold text-indigo-900 mb-1">1. Regra das Condições (&& e ||)</h4>
                                    <p className="text-sm text-indigo-800">
                                        O <b>&& (E)</b> obriga a estar na coordenada exata (ex: Canto Superior Esquerdo = tem de ser a Coluna 1 E a Linha 1 ao mesmo tempo).<br/>
                                        O <b>|| (OU)</b> é mais flexível: basta estar colado à parede esquerda OU à parede direita para pintar o limite de 'B'.
                                    </p>
                                </div>

                                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                                    <h4 className="font-bold text-amber-900 mb-1">2. Porque testamos os Cantos primeiro?</h4>
                                    <p className="text-sm text-amber-800">
                                        Os cantos também fazem parte da "parede" esquerda/direita e do "teto". Se o código verificasse primeiro se era "parede", desenharia um 'B' no canto e estragaria o desenho. O código resolve do mais restrito (Cantos) para o mais genérico (Paredes).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-slate-100 pt-8">
                            <h3 className="font-bold text-slate-800 text-center mb-4">Grelha Simplificada (Como Explicar)</h3>
                            <div className="flex flex-col items-center gap-2 font-mono text-sm font-bold">
                                <div className="flex gap-2">
                                    <div className="bg-slate-800 text-white w-20 h-20 flex flex-col items-center justify-center rounded-lg">A<span className="text-[9px] font-normal text-slate-400 mt-1">[C=1, R=1]</span></div>
                                    <div className="bg-slate-200 text-slate-600 w-24 h-20 flex flex-col items-center justify-center rounded-lg">B<span className="text-[9px] font-normal text-slate-500 mt-1">[R=1]</span></div>
                                    <div className="bg-slate-800 text-white w-20 h-20 flex flex-col items-center justify-center rounded-lg">A<span className="text-[9px] font-normal text-slate-400 mt-1">[C=x, R=1]</span></div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="bg-slate-200 text-slate-600 w-20 h-16 flex flex-col items-center justify-center rounded-lg">B<span className="text-[9px] font-normal text-slate-500 mt-1">[C=1]</span></div>
                                    <div className="bg-white border-2 border-dashed border-slate-300 text-slate-400 w-24 h-16 flex flex-col items-center justify-center rounded-lg">SPC<span className="text-[9px] font-normal text-slate-400 mt-1">else</span></div>
                                    <div className="bg-slate-200 text-slate-600 w-20 h-16 flex flex-col items-center justify-center rounded-lg">B<span className="text-[9px] font-normal text-slate-500 mt-1">[C=x]</span></div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="bg-slate-800 text-white w-20 h-20 flex flex-col items-center justify-center rounded-lg">C<span className="text-[9px] font-normal text-slate-400 mt-1">[C=1, R=y]</span></div>
                                    <div className="bg-slate-200 text-slate-600 w-24 h-20 flex flex-col items-center justify-center rounded-lg">B<span className="text-[9px] font-normal text-slate-500 mt-1">[R=y]</span></div>
                                    <div className="bg-slate-800 text-white w-20 h-20 flex flex-col items-center justify-center rounded-lg">C<span className="text-[9px] font-normal text-slate-400 mt-1">[C=x, R=y]</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SECÇÃO GIT GLOBAL */}
                {activeTab === 'git' && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-10 shadow-sm">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
                            <GitBranch className="text-indigo-600" size={32} /> Fluxo de Teste e Entrega Git
                        </h2>
                        <p className="text-slate-600 mb-8 leading-relaxed max-w-3xl">
                            A regra de ouro da piscina é: se o teu código funciona mas não compilou na Moulinette, tens um zero. Segue rigorosamente estes passos antes de qualquer entrega oficial.
                        </p>

                        <div className="space-y-6">

                            <div className="relative pl-8 pb-6 border-l-2 border-slate-200 last:border-0 last:pb-0">
                                <div className="absolute -left-4 top-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">1</div>
                                <h3 className="font-bold text-slate-800 text-lg mb-2">A Norma (Norminette)</h3>
                                <p className="text-slate-600 text-sm mb-3">O teu código pode estar perfeito, mas se tiver espaços a mais no fim da linha ou se faltar o cabeçalho 42, é zero. Verifica sempre primeiro.</p>
                                <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-emerald-400">
                                    <span className="text-slate-500">$</span> norminette -R CheckForbiddenSourceHeader ft_putchar.c
                                </div>
                            </div>

                            <div className="relative pl-8 pb-6 border-l-2 border-slate-200 last:border-0 last:pb-0">
                                <div className="absolute -left-4 top-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">2</div>
                                <h3 className="font-bold text-slate-800 text-lg mb-2">Compilar (O Comando Sagrado)</h3>
                                <p className="text-slate-600 text-sm mb-3">Tens de juntar o teu `main.c` (onde chamas a função) com o teu exercício. O compilador vai cuspir erros se quebrares as regras.</p>
                                <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-emerald-400 flex flex-col gap-2">
                                    <div><span className="text-slate-500">$</span> cc -Wall -Wextra -Werror main.c ft_putchar.c</div>
                                    <div className="text-slate-400 text-xs italic font-sans mt-1">Isso vai criar um ficheiro chamado `a.out` no teu terminal.</div>
                                </div>
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mt-3 rounded-r-lg">
                                    <p className="text-sm text-amber-800"><b>Atenção:</b> Se não puseres `-Wall -Wextra -Werror`, o compilador pode deixar passar erros escondidos que a Moulinette não perdoa!</p>
                                </div>
                            </div>

                            <div className="relative pl-8 pb-6 border-l-2 border-slate-200 last:border-0 last:pb-0">
                                <div className="absolute -left-4 top-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">3</div>
                                <h3 className="font-bold text-slate-800 text-lg mb-2">Testar</h3>
                                <p className="text-slate-600 text-sm mb-3">Executa o programa que acabaste de compilar para ver o output no ecrã.</p>
                                <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-emerald-400">
                                    <span className="text-slate-500">$</span> ./a.out
                                </div>
                            </div>

                            <div className="relative pl-8 pb-6 border-l-2 border-slate-200 last:border-0 last:pb-0">
                                <div className="absolute -left-4 top-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-700 font-bold border border-rose-200">4</div>
                                <h3 className="font-bold text-rose-700 text-lg mb-2">A LIMPEZA CRÍTICA!</h3>
                                <p className="text-slate-600 text-sm mb-3">A Moulinette exige pastas limpas. Se enviares o ficheiro `main.c` ou o executável `a.out` para o Git, vais ter zero imediato. Apaga tudo o que usaste para testar.</p>
                                <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-rose-400">
                                    <span className="text-slate-500">$</span> rm main.c a.out
                                </div>
                            </div>

                            <div className="relative pl-8 pb-6 border-l-2 border-slate-200 last:border-0 last:pb-0">
                                <div className="absolute -left-4 top-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">5</div>
                                <h3 className="font-bold text-slate-800 text-lg mb-2">Git Push (Entrega Oficial)</h3>
                                <p className="text-slate-600 text-sm mb-3">Com a pasta limpa, apenas com os exercícios oficiais, estás pronto para submeter.</p>
                                <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-emerald-400 space-y-1">
                                    <div><span className="text-slate-500">$</span> git add ft_putchar.c</div>
                                    <div><span className="text-slate-500">$</span> git commit -m "feat: entregando ex00 pronto e testado"</div>
                                    <div><span className="text-slate-500">$</span> git push</div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* SECÇÃO MAN PAGES */}
                {activeTab === 'man' && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-10 shadow-sm">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
                            <BookOpen className="text-indigo-600" size={32} /> Man Pages de Sobrevivência (Exames)
                        </h2>
                        <p className="text-slate-600 mb-8 leading-relaxed max-w-3xl">
                            Durante os exames (e nos exercícios), não podes ir ao Google. O teu melhor amigo é o manual interno do sistema operativo: as "Man Pages" (Páginas de Manual). Basta escreveres `man` seguido do comando que queres entender.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                                <div className="font-mono text-indigo-700 font-bold text-lg mb-2 bg-indigo-100 px-3 py-1 rounded-md w-fit">
                                    $ man ascii
                                </div>
                                <p className="text-slate-700 font-bold mb-2">A Tabela Salva-Vidas</p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Abre a tabela ASCII diretamente no terminal. Perfeito para relembrares na hora que o 'A' é o 65 e o 'a' é o 97. Usa isto sempre que estiveres num exame que envolva percorrer o alfabeto ou verificar se é número/letra.
                                </p>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                                <div className="font-mono text-indigo-700 font-bold text-lg mb-2 bg-indigo-100 px-3 py-1 rounded-md w-fit">
                                    $ man 2 write
                                </div>
                                <p className="text-slate-700 font-bold mb-2">A Assinatura do Write</p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Para verificares quais são os argumentos exatos que a função `write` recebe caso tenhas um branco na memória. Ele vai mostrar-te:<br/>
                                    <code>ssize_t write(int fd, const void *buf, size_t count);</code>
                                </p>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                                <div className="font-mono text-indigo-700 font-bold text-lg mb-2 bg-indigo-100 px-3 py-1 rounded-md w-fit">
                                    $ man 3 strlen
                                </div>
                                <p className="text-slate-700 font-bold mb-2">Para Consultar Bibliotecas</p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Se um exercício te pede para "reproduzir o comportamento da função original `strlen`" e tu não te lembras do que a original faz ou devolve, escreve isto. Vai explicar-te que ela devolve um `size_t` (um número). Podes fazer isto para `strcpy`, `strcmp`, etc.
                                </p>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                                <div className="font-mono text-indigo-700 font-bold text-lg mb-2 bg-indigo-100 px-3 py-1 rounded-md w-fit">
                                    Sair do Man Page
                                </div>
                                <p className="text-slate-700 font-bold mb-2">Como fechar o ecrã</p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Isto não é um comando man, mas um aviso! Para saíres do ecrã do manual e voltares para o teu terminal normal, prime apenas a tecla <b>`q`</b> (quit) no teu teclado.
                                </p>
                            </div>

                        </div>
                    </div>
                )}

            </main>

            <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
        </div>
    );
}