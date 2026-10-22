/* Conteúdo transcrito do códice original. Edite aqui para ampliar o guia. */
window.CODEX_DATA = [
  {
    "name": "Lorelay",
    "class": "Druida",
    "before": 1,
    "after": 2,
    "hp_before": 9,
    "hp_gain": 6,
    "hp_after": 15,
    "subtitle": "Uma nova forma de explorar a ilha e um caminho para sua magia.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Forma Selvagem",
            "2 usos por descanso curto ou longo. Use uma ação para assumir uma das formas escolhidas por até 1 h; sem voo ou natação. Usa os PV da besta e não lança magias transformada."
          ],
          [
            "Magia",
            "3 espaços de magia de nível 1. Após descanso longo, prepara 5 magias de druida; não precisa aprendê-las permanentemente."
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha 1 Círculo Druídico",
        "intro": "",
        "items": [
          [
            "Círculo da Terra",
            "Ganha 1 truque e Recuperação Natural: 1 vez por descanso longo, após descanso curto, recupera espaços cuja soma dos níveis dos espaços seja no máximo 1 no nível 2. Escolha também 1 terreno abaixo."
          ],
          [
            "Círculo da Lua",
            "Forma Selvagem passa a ação bônus. Use as formas escolhidas; sem voo ou natação no nível 2. Transformada, pode gastar 1 espaço de magia como ação bônus para curar 1d8 por nível do espaço."
          ]
        ]
      },
      {
        "kind": "conditional",
        "title": "Se escolheu Terra: escolha 1 terreno",
        "intro": "As duas magias do terreno ficam sempre preparadas a partir do nível 3 e não ocupam vagas.",
        "items": [
          [
            "Ártico",
            "No nível 3: Imobilizar Pessoa (paralisa humanoide) e Crescimento de Espinhos (área que fere ao mover)."
          ],
          [
            "Costa",
            "No nível 3: Imagem Espelhada (duplicatas defensivas) e Passo Nebuloso (teleporte de 9 m)."
          ],
          [
            "Deserto",
            "No nível 3: Nublar (ataques contra você em desvantagem) e Silêncio (área sem som)."
          ],
          [
            "Floresta",
            "No nível 3: Pele de Árvore (CA mínima 16) e Patas de Aranha (anda em paredes)."
          ],
          [
            "Pradaria",
            "No nível 3: Invisibilidade (alvo some) e Passos sem Pegadas (+10 em Furtividade ao grupo)."
          ],
          [
            "Montanha",
            "No nível 3: Patas de Aranha (anda em paredes) e Crescimento de Espinhos (área perigosa)."
          ],
          [
            "Pântano",
            "No nível 3: Escuridão (trevas mágicas) e Flecha Ácida de Melf (ácido imediato e posterior)."
          ],
          [
            "Subterrâneo",
            "No nível 3: Patas de Aranha (anda em paredes) e Teia (prende inimigos)."
          ]
        ]
      },
      {
        "kind": "spells",
        "title": "Se escolheu Terra: escolha 1 truque extra",
        "intro": "No nível 2, escolha entre os truques que Lorelay ainda não conhece.",
        "items": [
          [
            "Orientação",
            "+1d4 a um teste de atributo de uma criatura; concentração"
          ],
          [
            "Consertar",
            "repara uma ruptura pequena em um objeto"
          ],
          [
            "Borrifo Venenoso",
            "alvo próximo testa CON ou sofre dano de veneno"
          ],
          [
            "Resistência",
            "+1d4 a uma resistência; concentração"
          ],
          [
            "Bordão Místico",
            "bastão/porrete usa SAB em ataques e dano; arma fica mágica"
          ],
          [
            "Chicote de Espinhos",
            "ataque a 9 m; 1d6 perfurante e puxa alvo Grande ou menor até 3 m"
          ]
        ]
      }
    ]
  },
  {
    "name": "Lorelay",
    "class": "Druida",
    "before": 2,
    "after": 3,
    "hp_before": 15,
    "hp_gain": 6,
    "hp_after": 21,
    "subtitle": "As magias de nível 2 entram na preparação diária.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Espaços de magia",
            "Agora há 4 espaços de magia de nível 1 e 2 espaços de magia de nível 2; todos voltam após descanso longo."
          ],
          [
            "Preparação diária",
            "Após descanso longo, escolhe 6 magias de druida de nível 1 ou nível 2. Terra soma duas magias do terreno sem ocupar vaga; Recuperação Natural recupera soma dos níveis dos espaços até 2."
          ],
          [
            "Forma Selvagem",
            "Mantém 2 usos e duração de até 1 h. Use as formas escolhidas; natação ainda não está liberada."
          ]
        ]
      },
      {
        "kind": "spells",
        "title": "Novas opções para preparar: nível 2",
        "intro": "Não é uma escolha permanente: mostre as opções ao preparar depois de cada descanso longo. Concentração: apenas uma magia desse tipo por vez.",
        "items": [
          [
            "Mensageiro Animal",
            "besta pequena leva recado a um destino; ritual"
          ],
          [
            "Pele de Árvore",
            "CA do alvo não fica abaixo de 16; concentração"
          ],
          [
            "Sentidos da Fera",
            "percebe pelos sentidos de uma besta voluntária; concentração; ritual"
          ],
          [
            "Visão no Escuro",
            "dá visão no escuro por 8 h"
          ],
          [
            "Aprimorar Habilidade",
            "vantagem em testes de um atributo; concentração"
          ],
          [
            "Encontrar Armadilhas",
            "sente armadilhas próximas, sem revelar tudo"
          ],
          [
            "Lâmina Flamejante",
            "arma de fogo na mão; ataque mágico 3d6; concentração"
          ],
          [
            "Esfera Flamejante",
            "esfera móvel que causa fogo; ação bônus para movê-la; concentração"
          ],
          [
            "Lufada de Vento",
            "linha de vento empurra e dificulta avanço; concentração"
          ],
          [
            "Esquentar Metal",
            "aquece metal; 2d8 e pode forçar largar; concentração"
          ],
          [
            "Imobilizar Pessoa",
            "paralisa humanoide; SAB anula e pode repetir; concentração"
          ],
          [
            "Restauração Menor",
            "remove uma doença ou condição específica"
          ],
          [
            "Localizar Animais ou Plantas",
            "indica direção/distância de tipo conhecido; ritual"
          ],
          [
            "Localizar Objeto",
            "localiza objeto conhecido próximo; concentração"
          ],
          [
            "Raio Lunar",
            "coluna de luz causa 2d10 por turno; CON reduz; concentração"
          ],
          [
            "Passos sem Pegadas",
            "+10 em Furtividade ao grupo próximo; concentração"
          ],
          [
            "Proteção contra Veneno",
            "neutraliza veneno e dá resistência a veneno"
          ],
          [
            "Crescimento de Espinhos",
            "terreno difícil e 2d4 a cada 1,5 m; concentração"
          ]
        ]
      }
    ]
  },
  {
    "name": "Lorelay",
    "class": "Druida",
    "before": 3,
    "after": 4,
    "hp_before": 21,
    "hp_gain": 6,
    "hp_after": 27,
    "subtitle": "Mais um truque, formas aquáticas e uma melhora de atributo.",
    "hp_note": "27 PV antes de eventual aumento retroativo por CON.",
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Truque novo",
            "Aprende mais um truque de druida. Se escolheu Círculo da Terra, ele se soma ao truque recebido no nível 2."
          ],
          [
            "Magia",
            "4 espaços de magia de nível 1, 3 espaços de magia de nível 2 e 7 magias preparadas após descanso longo."
          ],
          [
            "Forma Selvagem",
            "A quinta forma especial é liberada; natação também, mas voo ainda não."
          ]
        ]
      },
      {
        "kind": "spells",
        "title": "Escolha 1 truque de druida",
        "intro": "Arte Druídica e Produzir Chamas já são conhecidos. Se escolheu Terra, exclua também o truque ganho no nível 2.",
        "items": [
          [
            "Orientação",
            "+1d4 a um teste de atributo de uma criatura; concentração"
          ],
          [
            "Consertar",
            "repara uma ruptura pequena em um objeto"
          ],
          [
            "Borrifo Venenoso",
            "alvo próximo testa CON ou sofre dano de veneno"
          ],
          [
            "Resistência",
            "+1d4 a uma resistência; concentração"
          ],
          [
            "Bordão Místico",
            "bastão/porrete usa SAB em ataques e dano; arma fica mágica"
          ],
          [
            "Chicote de Espinhos",
            "ataque a 9 m; 1d6 perfurante e puxa alvo Grande ou menor até 3 m"
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha de atributos",
        "intro": "Talentos são opcionais e não entram neste guia. Compare os números antes de decidir.",
        "items": [
          [
            "+2 em um atributo",
            "Aumente um atributo em 2; ele não pode ultrapassar 20."
          ],
          [
            "+1 em dois atributos",
            "Aumente dois atributos diferentes em 1; nenhum pode ultrapassar 20."
          ]
        ]
      },
      {
        "kind": "mechanical_note",
        "title": "Exemplos com os atributos atuais",
        "intro": "",
        "items": [
          [
            "Se escolher",
            "SAB 16 → 18 melhora CD de magia 13 → 14, ataque mágico +5 → +6 e aumenta em 1 o número de magias preparadas. CON 12 → 14 daria 31 PV no nível 4."
          ]
        ]
      }
    ]
  },
  {
    "name": "Duki",
    "class": "Ladino",
    "before": 1,
    "after": 2,
    "hp_before": 9,
    "hp_gain": 6,
    "hp_after": 15,
    "subtitle": "O turno do ladino fica muito mais móvel.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Ação Ardilosa",
            "Em cada turno, pode usar a ação bônus para Disparar, Desengajar ou Esconder-se. Não gasta recurso. A ação normal continua disponível."
          ],
          [
            "Ataque Furtivo",
            "Continua +1d6 uma vez por turno quando usa arma de acuidade/à distância e tem vantagem, ou aliado junto ao alvo sem desvantagem."
          ],
          [
            "Escolhas",
            "Nenhuma escolha de classe neste nível. Basta atualizar PV e anotar Ação Ardilosa."
          ]
        ]
      },
      {
        "kind": "note",
        "title": "Nota",
        "intro": "Exemplo: Duki ataca, usa Desengajar como ação bônus e sai do alcance sem provocar ataque de oportunidade. Só existe uma ação bônus por turno.",
        "items": []
      }
    ]
  },
  {
    "name": "Duki",
    "class": "Ladino",
    "before": 2,
    "after": 3,
    "hp_before": 15,
    "hp_gain": 6,
    "hp_after": 21,
    "subtitle": "Um arquétipo define como Duki usa sua esperteza.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Ataque Furtivo",
            "Aumenta de +1d6 para +2d6 uma vez por turno. As condições para usar continuam as mesmas."
          ],
          [
            "Se for Trapaceiro Arcano",
            "Ganha 3 truques de mago (Mãos Mágicas obrigatório), 3 magias conhecidas de nível 1 e 2 espaços de magia de nível 1; CD 12, ataque mágico +4 com INT 15."
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha 1 arquétipo",
        "intro": "",
        "items": [
          [
            "Ladrão",
            "Mãos Rápidas: Ação Ardilosa também usa Prestidigitação (mãos), ferramentas de ladrão em trancas/armadilhas ou Usar Objeto. Escalar sem custo extra de movimento; salto com corrida +DES em distância."
          ],
          [
            "Assassino",
            "Proficiência em kit de disfarce e venenos. No turno inicial, vantagem contra criaturas que ainda não agiram; acerto em criatura surpreendida é crítico."
          ],
          [
            "Trapaceiro Arcano",
            "Usa magia de mago para infiltração. Mãos Mágicas pode ficar invisível, abrir fechaduras e manipular bolsos a distância; controlá-la passa a ação bônus."
          ]
        ]
      },
      {
        "kind": "heading",
        "title": "SE ESCOLHER TRAPACEIRO ARCANO · ESCOLHA 2 TRUQUES ALÉM DE MÃOS MÁGICAS",
        "intro": "",
        "items": []
      },
      {
        "kind": "conditional_spells",
        "title": "",
        "intro": "",
        "items": [
          [
            "Mãos Mágicas [obrigatório]",
            "mão remota que manipula objetos leves; Trapaceiro a aprimora"
          ],
          [
            "Borrifo Ácido",
            "até 2 alvos próximos testam DES ou sofrem 1d6 ácido"
          ],
          [
            "Proteção contra Lâminas",
            "ação; resistência a dano de armas até o próximo turno"
          ],
          [
            "Toque Arrepiante",
            "ataque distante, 1d8 necrótico; alvo não cura por uma rodada"
          ],
          [
            "Luzes Dançantes",
            "quatro pequenas luzes móveis; concentração"
          ],
          [
            "Raio de Fogo",
            "ataque distante; 1d10 fogo"
          ],
          [
            "Amizade",
            "vantagem em testes de CAR contra alvo; depois ele nota a magia"
          ],
          [
            "Luz",
            "objeto ilumina por 1 h"
          ],
          [
            "Consertar",
            "repara ruptura pequena em objeto"
          ],
          [
            "Mensagem",
            "sussurra à distância; alvo responde brevemente"
          ],
          [
            "Ilusão Menor",
            "cria som ou imagem estática pequena"
          ],
          [
            "Borrifo Venenoso",
            "alvo próximo testa CON ou sofre veneno"
          ],
          [
            "Prestidigitação",
            "pequenos efeitos mágicos sensoriais ou limpeza"
          ],
          [
            "Raio de Gelo",
            "ataque distante, 1d8 frio e reduz deslocamento"
          ],
          [
            "Toque Chocante",
            "ataque corpo a corpo, 1d8 elétrico e corta reações"
          ],
          [
            "Ataque Certeiro",
            "ação e concentração para vantagem no próximo ataque"
          ]
        ]
      },
      {
        "kind": "heading",
        "title": "ESCOLHA 3 MAGIAS DE NÍVEL 1",
        "intro": "",
        "items": []
      },
      {
        "kind": "paragraph",
        "title": "",
        "intro": "Duas devem ser [E] Encantamento ou [I] Ilusão; a outra pode ser de qualquer escola da lista abaixo. Magias com marca 'ritual' ainda gastam espaço para Duki.",
        "items": []
      },
      {
        "kind": "conditional_spells",
        "title": "",
        "intro": "",
        "items": [
          [
            "Alarme",
            "avisa quando alguém invade uma área; ritual"
          ],
          [
            "Mãos Flamejantes",
            "cone de fogo; DES ou 3d6, metade no sucesso"
          ],
          [
            "Enfeitiçar Pessoa [E]",
            "humanoide amistoso; SAB anula"
          ],
          [
            "Orbe Cromática",
            "ataque 3d8; escolha tipo de dano; diamante caro obrigatório"
          ],
          [
            "Borrão Colorido [I]",
            "cone que cega criaturas conforme total de PV rolado"
          ],
          [
            "Compreender Idiomas",
            "entende línguas; ritual, mas Trapaceiro não lança como ritual"
          ],
          [
            "Detectar Magia",
            "sente magia próxima; concentração"
          ],
          [
            "Disfarçar-se [I]",
            "muda aparência por 1 h"
          ],
          [
            "Retirada Acelerada",
            "pode Disparar com ação bônus; concentração"
          ],
          [
            "Vida Falsa",
            "ganha 1d4+4 PV temporários"
          ],
          [
            "Queda Suave",
            "reação para reduzir a queda de até 5 criaturas"
          ],
          [
            "Encontrar Familiar",
            "espírito em forma animal; utilidade e exploração"
          ],
          [
            "Nuvem de Névoa",
            "área que bloqueia visão; concentração"
          ],
          [
            "Graxa",
            "área escorregadia; DES ou queda"
          ],
          [
            "Identificar",
            "revela propriedades de item mágico"
          ],
          [
            "Escrita Ilusória [I]",
            "disfarça escrita para quem a lê"
          ],
          [
            "Salto",
            "triplica distância de salto"
          ],
          [
            "Passos Longos",
            "+3 m de deslocamento por 1 h"
          ],
          [
            "Armadura Arcana",
            "CA 13 + DES por 8 h, se sem armadura"
          ],
          [
            "Mísseis Mágicos",
            "três dardos de energia acertam automaticamente"
          ],
          [
            "Proteção contra Bem e Mal",
            "defesa contra certos tipos de criaturas; concentração"
          ],
          [
            "Raio de Enjoo",
            "ataque venenoso; CON ou envenenado"
          ],
          [
            "Escudo Arcano",
            "reação; +5 CA até início do próximo turno"
          ],
          [
            "Imagem Silenciosa [I]",
            "ilusão visual móvel; concentração"
          ],
          [
            "Sono [E]",
            "adormece criaturas com PV mais baixos antes"
          ],
          [
            "Risada Histérica de Tasha [E]",
            "SAB ou caído e incapacitado; concentração"
          ],
          [
            "Disco Flutuante de Tenser",
            "disco carrega carga; ritual não disponível ao Trapaceiro"
          ],
          [
            "Onda Trovejante",
            "cubo adjacente 2d8 e empurrão; CON reduz"
          ],
          [
            "Servo Invisível",
            "servo simples não combatente"
          ],
          [
            "Raio de Bruxa",
            "ataque elétrico; mantém dano com ações; concentração"
          ]
        ]
      }
    ]
  },
  {
    "name": "Duki",
    "class": "Ladino",
    "before": 3,
    "after": 4,
    "hp_before": 21,
    "hp_gain": 6,
    "hp_after": 27,
    "subtitle": "Uma escolha de atributo; o Trapaceiro amplia seu repertório.",
    "hp_note": "27 PV antes de eventual aumento retroativo por CON.",
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Ataque Furtivo",
            "Permanece +2d6 uma vez por turno."
          ],
          [
            "Se for Trapaceiro Arcano",
            "Passa a 4 magias conhecidas e 3 espaços de magia de nível 1. A magia nova deve ser [E] ou [I]; os três truques permanecem."
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha de atributos",
        "intro": "Talentos são opcionais e não entram neste guia. Compare os números antes de decidir.",
        "items": [
          [
            "+2 em um atributo",
            "Aumente um atributo em 2; ele não pode ultrapassar 20."
          ],
          [
            "+1 em dois atributos",
            "Aumente dois atributos diferentes em 1; nenhum pode ultrapassar 20."
          ]
        ]
      },
      {
        "kind": "mechanical_note",
        "title": "Exemplos com os atributos atuais",
        "intro": "",
        "items": [
          [
            "Se escolher",
            "DES 15 → 17 eleva o modificador +2 → +3: ataque, dano, CA, iniciativa e Furtividade melhoram. DES 15 → 16 e INT 15 → 16 também melhora a CD do Trapaceiro 12 → 13."
          ]
        ]
      },
      {
        "kind": "conditional",
        "title": "Se for Trapaceiro: escolha mais uma magia",
        "intro": "Pode escolher apenas Encantamento/Ilusão. As opções da tabela maior, no nível 3, continuam úteis para trocar uma magia ao subir.",
        "items": [
          [
            "Enfeitiçar Pessoa [E]",
            "humanoide amistoso; SAB anula"
          ],
          [
            "Borrão Colorido [I]",
            "cone que cega criaturas conforme total de PV rolado"
          ],
          [
            "Disfarçar-se [I]",
            "muda aparência por 1 h"
          ],
          [
            "Escrita Ilusória [I]",
            "disfarça escrita para quem a lê"
          ],
          [
            "Imagem Silenciosa [I]",
            "ilusão visual móvel; concentração"
          ],
          [
            "Sono [E]",
            "adormece criaturas com PV mais baixos antes"
          ],
          [
            "Risada Histérica de Tasha [E]",
            "SAB ou caído e incapacitado; concentração"
          ]
        ]
      }
    ]
  },
  {
    "name": "Milagres Kikito",
    "class": "Bardo",
    "before": 1,
    "after": 2,
    "hp_before": 7,
    "hp_gain": 4,
    "hp_after": 11,
    "subtitle": "A canção passa a ajudar mais até nos descansos.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Versatilidade",
            "Em teste de atributo sem proficiência, soma metade da proficiência arredondada para baixo: +1 agora. Também vale para iniciativa."
          ],
          [
            "Descanso Inspirador",
            "No fim de descanso curto, aliados que gastaram Dados de Vida recuperam +1d6 PV adicionais."
          ],
          [
            "Magia",
            "3 espaços de magia de nível 1; passa de 4 para 5 magias conhecidas. Escolhe 1 nova magia de nível 1 agora; pode trocar outra conhecida ao subir."
          ]
        ]
      },
      {
        "kind": "spells",
        "title": "Escolha 1 magia nova de nível 1",
        "intro": "As quatro magias já conhecidas foram retiradas desta lista. Magias conhecidas ficam na ficha até uma futura troca por nível.",
        "items": [
          [
            "Amizade Animal",
            "tenta acalmar besta por 24 h; SAB anula"
          ],
          [
            "Perdição",
            "até 3 alvos perdem 1d4 em ataques e resistências; concentração"
          ],
          [
            "Enfeitiçar Pessoa",
            "humanoide pode ficar amistoso; SAB anula"
          ],
          [
            "Compreender Idiomas",
            "entende línguas faladas/escritas; ritual"
          ],
          [
            "Curar Ferimentos",
            "toque; cura 1d8 + CAR"
          ],
          [
            "Detectar Magia",
            "sente magia próxima; ritual, concentração"
          ],
          [
            "Disfarçar-se",
            "muda a aparência por 1 h"
          ],
          [
            "Sussurros Dissonantes",
            "SAB ou 3d6 psíquico e o alvo se afasta com a reação"
          ],
          [
            "Queda Suave",
            "reação; até 5 criaturas caem devagar"
          ],
          [
            "Heroísmo",
            "alvo não fica amedrontado e ganha PV temporários por turno; concentração"
          ],
          [
            "Identificar",
            "revela propriedades mágicas de objeto; ritual"
          ],
          [
            "Escrita Ilusória",
            "mensagem escrita parece outra coisa; ritual"
          ],
          [
            "Passos Longos",
            "+3 m de deslocamento por 1 h"
          ],
          [
            "Imagem Silenciosa",
            "ilusão visual móvel; concentração"
          ],
          [
            "Risada Histérica de Tasha",
            "SAB ou alvo cai e fica incapacitado; concentração"
          ],
          [
            "Falar com Animais",
            "conversa com bestas por 10 min; ritual"
          ],
          [
            "Servo Invisível",
            "servo simples não combatente por 1 h; ritual"
          ]
        ]
      }
    ]
  },
  {
    "name": "Milagres Kikito",
    "class": "Bardo",
    "before": 2,
    "after": 3,
    "hp_before": 11,
    "hp_gain": 4,
    "hp_after": 15,
    "subtitle": "O bardo escolhe um colégio e libera magias de nível 2.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Especialização",
            "Escolha 2 perícias nas quais já seja proficiente; nelas, proficiência passa de +2 para +4."
          ],
          [
            "Magia",
            "4 espaços de magia de nível 1 e 2 espaços de magia de nível 2; passa de 5 para 6 magias conhecidas. Aprende 1 magia de nível 1 ou nível 2; pode trocar outra ao subir."
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha 1 Colégio de Bardo",
        "intro": "",
        "items": [
          [
            "Conhecimento",
            "Ganha proficiência em 3 perícias quaisquer. Palavras Cortantes: reação e 1 uso de Inspiração para subtrair 1d6 de ataque, teste ou dano de criatura que o ouça a até 18 m."
          ],
          [
            "Bravura",
            "Ganha armadura média, escudo e armas marciais. Você concede Inspiração de Bardo como ação bônus. O aliado pode gastar o d6 para somar dano a um ataque ou usar a própria reação para somá-lo à CA contra um ataque antes de saber o resultado."
          ]
        ]
      },
      {
        "kind": "spells",
        "title": "Escolha 1 magia de nível 1 ou nível 2",
        "intro": "Estas são as opções novas de nível 2. A lista de nível 1 do nível anterior também continua disponível. O jogador escolhe só uma magia nova.",
        "items": [
          [
            "Mensageiro Animal",
            "besta pequena leva recado; ritual"
          ],
          [
            "Cegueira/Surdez",
            "CON ou cego/surdo; sem concentração"
          ],
          [
            "Acalmar Emoções",
            "suprime medo/encanto ou hostilidade; concentração"
          ],
          [
            "Coroa da Loucura",
            "humanoide pode atacar criatura escolhida por você; SAB anula; concentração"
          ],
          [
            "Detectar Pensamentos",
            "lê pensamentos superficiais; concentração"
          ],
          [
            "Aprimorar Habilidade",
            "vantagem em testes de um atributo; concentração"
          ],
          [
            "Fascinar",
            "distrai criaturas que veem/ouvem você"
          ],
          [
            "Esquentar Metal",
            "2d8 por turno em objeto de metal; concentração"
          ],
          [
            "Imobilizar Pessoa",
            "paralisa humanoide; SAB anula; concentração"
          ],
          [
            "Invisibilidade",
            "alvo invisível até atacar ou lançar magia; concentração"
          ],
          [
            "Arrombar",
            "abre tranca/barreira; faz ruído alto"
          ],
          [
            "Restauração Menor",
            "remove doença ou uma condição específica"
          ],
          [
            "Localizar Animais ou Plantas",
            "indica direção/distância de tipo conhecido; ritual"
          ],
          [
            "Localizar Objeto",
            "localiza objeto conhecido; concentração"
          ],
          [
            "Força Fantasmagórica",
            "INT ou alvo acredita numa ilusão pessoal, que pode causar 1d6 psíquico; concentração"
          ],
          [
            "Boca Mágica",
            "objeto pronuncia mensagem sob condição; ritual"
          ],
          [
            "Ver o Invisível",
            "enxerga invisíveis por 1 h"
          ],
          [
            "Despedaçar",
            "esfera causa 3d8 trovejante; CON reduz"
          ],
          [
            "Silêncio",
            "área sem som, bloqueia magia verbal; concentração; ritual"
          ],
          [
            "Sugestão",
            "ordem plausível, SAB anula; concentração"
          ],
          [
            "Zona da Verdade",
            "CAR ou não consegue mentir dentro da área"
          ]
        ]
      }
    ]
  },
  {
    "name": "Milagres Kikito",
    "class": "Bardo",
    "before": 3,
    "after": 4,
    "hp_before": 15,
    "hp_gain": 4,
    "hp_after": 19,
    "subtitle": "A voz fica mais poderosa e surge um novo truque.",
    "hp_note": "19 PV antes de eventual aumento retroativo por CON.",
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Truque",
            "Aprende mais um truque de bardo."
          ],
          [
            "Magia",
            "4 espaços de magia de nível 1 e 3 espaços de magia de nível 2; passa de 6 para 7 magias conhecidas. Escolhe uma magia de nível 1 ou nível 2 das listas anteriores; pode trocar outra conhecida."
          ],
          [
            "Inspiração de Bardo",
            "O dado ainda é d6. Usos por descanso longo seguem o modificador de CAR: 3 agora, ou 4 se CAR subir a 18/19."
          ]
        ]
      },
      {
        "kind": "spells",
        "title": "Escolha 1 truque novo",
        "intro": "Já conhece Zombaria Viciosa e Prestidigitação.",
        "items": [
          [
            "Proteção contra Lâminas",
            "ação; resistência a dano contundente, cortante e perfurante de armas até próximo turno"
          ],
          [
            "Luzes Dançantes",
            "até quatro pequenas luzes; concentração"
          ],
          [
            "Luz",
            "objeto ilumina por 1 h"
          ],
          [
            "Amizade",
            "vantagem em testes de CAR contra uma criatura por até 1 min; depois ela sabe da magia"
          ],
          [
            "Mãos Mágicas",
            "mão a distância manipula objetos leves"
          ],
          [
            "Consertar",
            "repara objeto pequeno"
          ],
          [
            "Mensagem",
            "sussurro a 36 m com resposta curta"
          ],
          [
            "Ilusão Menor",
            "som ou imagem estática pequena"
          ],
          [
            "Ataque Certeiro",
            "ação para obter vantagem no próximo ataque; concentração"
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha de atributos",
        "intro": "Talentos são opcionais e não entram neste guia. Compare os números antes de decidir.",
        "items": [
          [
            "+2 em um atributo",
            "Aumente um atributo em 2; ele não pode ultrapassar 20."
          ],
          [
            "+1 em dois atributos",
            "Aumente dois atributos diferentes em 1; nenhum pode ultrapassar 20."
          ]
        ]
      },
      {
        "kind": "mechanical_note",
        "title": "Exemplos com os atributos atuais",
        "intro": "",
        "items": [
          [
            "Se escolher",
            "CAR 17 → 19 melhora CD 13 → 14, ataque mágico +5 → +6 e Inspiração de 3 → 4 usos. CAR 17 → 18 e CON 9 → 10 também melhoram magia e elevam os PV a 23."
          ]
        ]
      }
    ]
  },
  {
    "name": "João, o Andarilho",
    "class": "Patrulheiro",
    "before": 1,
    "after": 2,
    "hp_before": 12,
    "hp_gain": 8,
    "hp_after": 20,
    "subtitle": "O arco ganha um estilo; a magia entra agora.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Conjuração",
            "Aprende 2 magias de patrulheiro de nível 1; recebe 2 espaços de magia de nível 1 por descanso longo. CD 12 e ataque mágico +4 com SAB 14."
          ],
          [
            "Estilo de Luta",
            "Escolha exatamente 1 das quatro técnicas abaixo. Não ganha todas."
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha 1 Estilo de Luta",
        "intro": "",
        "items": [
          [
            "Arquearia",
            "+2 nas jogadas de ataque com armas à distância. Excelente para seu arco longo."
          ],
          [
            "Defesa",
            "+1 CA sempre que estiver usando armadura."
          ],
          [
            "Duelismo",
            "+2 no dano de arma corpo a corpo usada em uma mão sem outra arma na mão livre; escudo é permitido."
          ],
          [
            "Duas Armas",
            "Soma o modificador de atributo ao dano do segundo ataque feito como ação bônus ao lutar com duas armas."
          ]
        ]
      },
      {
        "kind": "spells",
        "title": "Escolha 2 magias de nível 1",
        "intro": "O patrulheiro conhece magias fixas e pode trocar uma ao subir de nível. Não as prepara diariamente nem lança rituais sem gastar espaço.",
        "items": [
          [
            "Alarme",
            "avisa intrusão em área; ritual"
          ],
          [
            "Amizade Animal",
            "tenta acalmar besta; SAB anula"
          ],
          [
            "Curar Ferimentos",
            "toque; cura 1d8 + SAB"
          ],
          [
            "Detectar Magia",
            "sente magia; concentração; patrulheiro não lança como ritual"
          ],
          [
            "Golpe Constritor",
            "ação bônus; próximo acerto com arma prende o alvo; FOR anula; concentração"
          ],
          [
            "Detectar Veneno e Doença",
            "sente venenos/doenças; sem ritual para patrulheiro"
          ],
          [
            "Nuvem de Névoa",
            "oculta área; concentração"
          ],
          [
            "Bom Fruto",
            "10 bagas; cada uma cura 1 PV e alimenta"
          ],
          [
            "Chuva de Espinhos",
            "ação bônus; próximo acerto com arma à distância espalha espinhos ao redor; DES reduz; concentração"
          ],
          [
            "Marca do Caçador",
            "ação bônus; +1d6 por acerto com arma no alvo; concentração"
          ],
          [
            "Salto",
            "triplica a distância de salto"
          ],
          [
            "Passos Longos",
            "+3 m de deslocamento por 1 h"
          ],
          [
            "Falar com Animais",
            "conversa com bestas; sem ritual para patrulheiro"
          ]
        ]
      }
    ]
  },
  {
    "name": "João, o Andarilho",
    "class": "Patrulheiro",
    "before": 2,
    "after": 3,
    "hp_before": 20,
    "hp_gain": 8,
    "hp_after": 28,
    "subtitle": "Escolha como João caça: sozinho ou ao lado de uma fera.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Mais magia",
            "Aprende mais uma magia de nível 1; fica com 3 espaços de magia de nível 1 por descanso longo."
          ],
          [
            "Consciência Primitiva",
            "Ação e 1 espaço: por 1 minuto por nível do espaço usado, sente se há certos tipos de criatura (inclusive dragões) a até 1,6 km; na costa, até 9,6 km. Não revela quantidade nem posição."
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha 1 Arquétipo",
        "intro": "",
        "items": [
          [
            "Caçador",
            "Escolha uma técnica de Presa do Caçador logo abaixo; é um bônus permanente de combate."
          ],
          [
            "Mestre das Feras",
            "Escolha uma companheira entre os blocos apresentados. Para ela atacar ou executar outras ações, João usa sua própria ação para dar ordem. Mantenha os dados da fera junto da ficha."
          ]
        ]
      },
      {
        "kind": "conditional",
        "title": "Se escolheu Caçador: 1 técnica",
        "intro": "",
        "items": [
          [
            "Matador de Colossos",
            "Uma vez por turno, ataque com arma que acerta inimigo já ferido causa +1d8."
          ],
          [
            "Assassino de Gigantes",
            "Reação: depois de ataque de criatura Grande+ a até 1,5 m contra você, ataque-a, se puder vê-la."
          ],
          [
            "Destruidor de Hordas",
            "Uma vez por turno, ao atacar com arma, faça outro ataque com a mesma arma contra inimigo diferente a até 1,5 m do primeiro e ao seu alcance."
          ]
        ]
      },
      {
        "kind": "spells",
        "title": "Escolha mais uma magia",
        "intro": "Escolha uma ainda não conhecida. A lista é a mesma do nível 2; foi repetida aqui para a decisão acontecer nesta tela.",
        "items": [
          [
            "Alarme",
            "avisa intrusão em área; ritual"
          ],
          [
            "Amizade Animal",
            "tenta acalmar besta; SAB anula"
          ],
          [
            "Curar Ferimentos",
            "toque; cura 1d8 + SAB"
          ],
          [
            "Detectar Magia",
            "sente magia; concentração; patrulheiro não lança como ritual"
          ],
          [
            "Golpe Constritor",
            "ação bônus; próximo acerto com arma prende o alvo; FOR anula; concentração"
          ],
          [
            "Detectar Veneno e Doença",
            "sente venenos/doenças; sem ritual para patrulheiro"
          ],
          [
            "Nuvem de Névoa",
            "oculta área; concentração"
          ],
          [
            "Bom Fruto",
            "10 bagas; cada uma cura 1 PV e alimenta"
          ],
          [
            "Chuva de Espinhos",
            "ação bônus; próximo acerto com arma à distância espalha espinhos ao redor; DES reduz; concentração"
          ],
          [
            "Marca do Caçador",
            "ação bônus; +1d6 por acerto com arma no alvo; concentração"
          ],
          [
            "Salto",
            "triplica a distância de salto"
          ],
          [
            "Passos Longos",
            "+3 m de deslocamento por 1 h"
          ],
          [
            "Falar com Animais",
            "conversa com bestas; sem ritual para patrulheiro"
          ]
        ]
      }
    ]
  },
  {
    "name": "João, o Andarilho",
    "class": "Patrulheiro",
    "before": 3,
    "after": 4,
    "hp_before": 28,
    "hp_gain": 8,
    "hp_after": 36,
    "subtitle": "Uma melhoria de atributo para moldar o estilo de João.",
    "hp_note": "36 PV antes de eventual aumento retroativo por CON.",
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Magia",
            "Mantém 3 magias conhecidas e 3 espaços de magia de nível 1. Pode trocar uma magia conhecida por outra de nível 1 ao subir."
          ],
          [
            "Se for Mestre das Feras",
            "O PV mínimo da companheira passa de 12 para 16. Atualize a ficha da besta."
          ],
          [
            "Se for Caçador",
            "Continua com a técnica escolhida no nível 3; não ganha outra neste nível."
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha de atributos",
        "intro": "Talentos são opcionais e não entram neste guia. Compare os números antes de decidir.",
        "items": [
          [
            "+2 em um atributo",
            "Aumente um atributo em 2; ele não pode ultrapassar 20."
          ],
          [
            "+1 em dois atributos",
            "Aumente dois atributos diferentes em 1; nenhum pode ultrapassar 20."
          ]
        ]
      },
      {
        "kind": "mechanical_note",
        "title": "Exemplos com os atributos atuais",
        "intro": "",
        "items": [
          [
            "Se escolher",
            "DES 16 → 18 melhora ataques/dano com arco e armas de acuidade, CA e iniciativa em +1. SAB 14 → 16 melhora CD de magia 12 → 13, ataque mágico +4 → +5 e Percepção/Sobrevivência em +1. CON 14 → 16 daria 40 PV."
          ]
        ]
      }
    ]
  },
  {
    "name": "KIEDIS",
    "class": "Monge",
    "before": 1,
    "after": 2,
    "hp_before": 7,
    "hp_gain": 4,
    "hp_after": 11,
    "subtitle": "Três usos novos da ação bônus e mais deslocamento.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Ki",
            "2 pontos de ki, recuperados em descanso curto ou longo com 30 min de meditação."
          ],
          [
            "Movimento",
            "Sem armadura ou escudo, deslocamento aumenta de 9 m para 12 m."
          ],
          [
            "Rajada de Golpes",
            "Depois da ação Atacar, gaste 1 ki e use ação bônus para fazer 2 golpes desarmados."
          ],
          [
            "Defesa Paciente",
            "Gaste 1 ki para Esquivar como ação bônus."
          ],
          [
            "Passo do Vento",
            "Gaste 1 ki para Disparar ou Desengajar como ação bônus; salto dobra no turno."
          ]
        ]
      },
      {
        "kind": "note",
        "title": "Nota",
        "intro": "Decisão deste nível: nenhuma. KIEDIS recebe as três técnicas de ki. Só pode usar uma ação bônus por turno.",
        "items": []
      }
    ]
  },
  {
    "name": "KIEDIS",
    "class": "Monge",
    "before": 2,
    "after": 3,
    "hp_before": 11,
    "hp_gain": 4,
    "hp_after": 15,
    "subtitle": "Uma tradição transforma o modo como KIEDIS luta.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Ki",
            "O máximo aumenta de 2 para 3 pontos."
          ],
          [
            "Desviar Projéteis",
            "Reação ao ser atingido por arma à distância: reduz dano em 1d10 + DES + nível = 1d10+5. Se zerar, pode segurar e gastar 1 ki para arremessar o projétil."
          ],
          [
            "Magia racial",
            "Como tiefling, pode usar Repreensão Infernal de nível 2 uma vez por descanso longo; usa CAR e não custa ki."
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha 1 Tradição Monástica",
        "intro": "",
        "items": [
          [
            "Mão Aberta",
            "Cada acerto da Rajada pode derrubar alvo (DES CD 11), empurrar até 4,5 m (FOR CD 11) ou cortar reações até o fim de seu próximo turno (sem resistência)."
          ],
          [
            "Sombra",
            "Ganha Ilusão Menor. Por 2 ki, lança Escuridão, Visão no Escuro, Passos sem Pegadas ou Silêncio. Veja os efeitos logo abaixo."
          ],
          [
            "Quatro Elementos",
            "Ganha Sintonia Elemental (pequenos efeitos) e escolhe uma disciplina da lista abaixo; custa ki quando usada."
          ]
        ]
      },
      {
        "kind": "conditional",
        "title": "Se escolheu Sombra: magias disponíveis",
        "intro": "",
        "items": [
          [
            "Ilusão Menor",
            "Truque gratuito: cria som ou imagem estática pequena."
          ],
          [
            "Escuridão · 2 ki",
            "Cria trevas mágicas em uma área; concentração."
          ],
          [
            "Visão no Escuro · 2 ki",
            "Dá visão no escuro a uma criatura por 8 h."
          ],
          [
            "Passos sem Pegadas · 2 ki",
            "Dá +10 em Furtividade ao grupo próximo; concentração."
          ],
          [
            "Silêncio · 2 ki",
            "Cria área muda e impede magia com componente verbal; concentração."
          ]
        ]
      },
      {
        "kind": "conditional",
        "title": "Se escolheu Quatro Elementos: escolha 1 disciplina",
        "intro": "",
        "items": [
          [
            "Presas de Fogo",
            "1 ki ao atacar: golpes desarmados alcançam +3 m e causam fogo; +1 ki ao acertar dá +1d10 fogo."
          ],
          [
            "Punho dos Quatro Trovões",
            "2 ki, ação: cubo adjacente; CON ou 2d8 trovejante e empurrão, metade do dano no sucesso."
          ],
          [
            "Punho do Ar Ininterrupto",
            "2 ki, ação: alvo a 9 m testa FOR; falha sofre 3d10, empurrão até 6 m e pode cair; sucesso metade."
          ],
          [
            "Rajada dos Ventos",
            "2 ki, ação: linha de vento que empurra e dificulta avanço; concentração."
          ],
          [
            "Forma do Rio Corrente",
            "1 ki, ação: molda/desloca água ou gelo próximo; sem dano direto."
          ],
          [
            "Golpe das Cinzas",
            "2 ki, ação: cone de fogo; DES ou 3d6, metade no sucesso."
          ],
          [
            "Chicote de Água",
            "2 ki, ação: alvo a 9 m testa DES; falha sofre 3d10 e pode ser puxado 7,5 m ou cair; sucesso metade."
          ]
        ]
      }
    ]
  },
  {
    "name": "KIEDIS",
    "class": "Monge",
    "before": 3,
    "after": 4,
    "hp_before": 15,
    "hp_gain": 4,
    "hp_after": 19,
    "subtitle": "Mais ki, reação contra quedas e um atributo melhorado.",
    "hp_note": "19 PV antes de eventual aumento retroativo por CON.",
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Ki",
            "Máximo sobe de 3 para 4 pontos; ainda recupera em descanso curto/longo."
          ],
          [
            "Queda Lenta",
            "Reação quando cair: reduz o dano de queda em 20 pontos."
          ],
          [
            "Movimento",
            "Permanece 12 m sem armadura/escudo."
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha de atributos",
        "intro": "Talentos são opcionais e não entram neste guia. Compare os números antes de decidir.",
        "items": [
          [
            "+2 em um atributo",
            "Aumente um atributo em 2; ele não pode ultrapassar 20."
          ],
          [
            "+1 em dois atributos",
            "Aumente dois atributos diferentes em 1; nenhum pode ultrapassar 20."
          ]
        ]
      },
      {
        "kind": "mechanical_note",
        "title": "Exemplos com os atributos atuais",
        "intro": "",
        "items": [
          [
            "Se escolher",
            "DES 15 → 17 melhora ataque, dano, CA e iniciativa em +1 (CA 13 → 14). SAB 12 → 14 melhora CA 13 → 14 e CD do ki 11 → 12. CON 8 → 10 daria 23 PV."
          ]
        ]
      }
    ]
  },
  {
    "name": "Calebi",
    "class": "Bruxo · Ínfero",
    "before": 1,
    "after": 2,
    "hp_before": 9,
    "hp_gain": 6,
    "hp_after": 15,
    "subtitle": "O pacto abre dois poderes permanentes.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Pacto Mágico",
            "Passa a 2 espaços de magia de nível 1, recuperados após descanso curto ou longo."
          ],
          [
            "Magia conhecida",
            "Passa de 2 para 3 magias conhecidas; escolha uma nova de nível 1. Pode trocar outra ao subir."
          ],
          [
            "Invocações Místicas",
            "Escolha 2 opções elegíveis abaixo. São poderes persistentes, separados das magias conhecidas."
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha 2 Invocações Místicas",
        "intro": "Rajada Agonizante combina com a Rajada Mística atual, mas o jogador pode escolher quaisquer duas elegíveis.",
        "items": [
          [
            "Rajada Agonizante",
            "Soma CAR ao dano de cada acerto de Rajada Mística; com CAR 16, +3."
          ],
          [
            "Armadura das Sombras",
            "Armadura Arcana em si mesmo à vontade, sem espaço: CA 13 + DES sem armadura."
          ],
          [
            "Fala das Feras",
            "Falar com Animais à vontade, sem espaço."
          ],
          [
            "Influência Sedutora",
            "Proficiência em Enganação e Persuasão."
          ],
          [
            "Visão Diabólica",
            "Enxerga em escuridão normal e mágica até 36 m."
          ],
          [
            "Visão Mística",
            "Detectar Magia à vontade, sem espaço."
          ],
          [
            "Lança Mística",
            "Rajada Mística passa de 36 m a 90 m de alcance."
          ],
          [
            "Olhos das Runas",
            "Consegue ler qualquer escrita."
          ],
          [
            "Vigor Infernal",
            "Vida Falsa em si mesmo à vontade; recebe PV temporários."
          ],
          [
            "Olhar de Duas Mentes",
            "Ação para sentir pelos sentidos de humanoide voluntário; cego/surdo aos próprios sentidos enquanto percebe pelo outro."
          ],
          [
            "Máscara de Muitas Faces",
            "Disfarçar-se à vontade, sem espaço."
          ],
          [
            "Visões Nebulosas",
            "Imagem Silenciosa à vontade, sem espaço."
          ],
          [
            "Rajada Repulsiva",
            "Rajada Mística empurra 3 m o alvo quando acerta."
          ],
          [
            "Ladrão dos Cinco Destinos",
            "Lança Perdição com espaço de pacto uma vez por descanso longo."
          ]
        ]
      },
      {
        "kind": "spells",
        "title": "Escolha 1 magia nova de nível 1",
        "intro": "Bruxaria (Hex) e Repreensão Infernal já são conhecidas. As opções [Fiend] entram na lista, mas não são automáticas.",
        "items": [
          [
            "Armadura de Agathys",
            "ganha 5 PV temporários; agressor corpo a corpo sofre 5 frio enquanto durarem"
          ],
          [
            "Braços de Hadar",
            "criaturas próximas testam FOR ou sofrem 2d6 e perdem reações"
          ],
          [
            "Enfeitiçar Pessoa",
            "humanoide pode ficar amistoso; SAB anula"
          ],
          [
            "Compreender Idiomas",
            "entende línguas por 1 h; bruxo pode usar ritual só se tiver regra que permita"
          ],
          [
            "Retirada Acelerada",
            "pode Disparar com ação bônus enquanto durar; concentração"
          ],
          [
            "Escrita Ilusória",
            "mensagem escrita enganosa; ritual requer regra que permita"
          ],
          [
            "Proteção contra Bem e Mal",
            "protege contra certos tipos de criatura; concentração"
          ],
          [
            "Servo Invisível",
            "servo simples; ritual requer regra que permita"
          ],
          [
            "Raio de Bruxa",
            "ataque a 9 m; 1d12 elétrico e pode repetir dano com ação; concentração"
          ],
          [
            "Mãos Flamejantes [Fiend]",
            "cone de fogo; DES ou 3d6, metade se passar"
          ],
          [
            "Comando [Fiend]",
            "ordem de uma palavra; SAB anula"
          ]
        ]
      }
    ]
  },
  {
    "name": "Calebi",
    "class": "Bruxo · Ínfero",
    "before": 2,
    "after": 3,
    "hp_before": 15,
    "hp_gain": 6,
    "hp_after": 21,
    "subtitle": "Uma Dádiva de Pacto muda a relação de Calebi com o Ínfero.",
    "hp_note": null,
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Pacto Mágico",
            "Ainda 2 espaços, agora ambos de nível 2. Mesmo magia de nível 1 gasta espaço de nível 2; espaços voltam em descanso curto/longo."
          ],
          [
            "Magia conhecida",
            "Passa de 3 para 4; aprende uma de nível 1 ou nível 2. Pode trocar outra conhecida ao subir."
          ],
          [
            "Magia racial drow",
            "Fogo das Fadas uma vez por descanso longo usando CAR, separado dos espaços do bruxo."
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha 1 Dádiva de Pacto",
        "intro": "",
        "items": [
          [
            "Corrente",
            "Ganha Encontrar Familiar, lançável como ritual, sem ocupar magia conhecida. Familiar pode ser comum ou diabrete, pseudodragão, quasit ou sprite; pode atacar com reação dele se Calebi abrir mão de um ataque da ação Atacar."
          ],
          [
            "Lâmina",
            "Ação para criar arma corpo a corpo na mão; proficiente e mágica. Em 2014, usa o atributo normal da arma, não CAR automaticamente."
          ],
          [
            "Tomo",
            "Ganha Livro das Sombras e escolhe 3 truques de qualquer classe, além dos truques de bruxo. Não é o Livro dos Pequenos Favores da campanha."
          ]
        ]
      },
      {
        "kind": "conditional",
        "title": "Se escolheu Tomo: opções práticas para 3 truques",
        "intro": "A lista completa permite qualquer truque de qualquer classe; estes são exemplos fáceis para um jogador novo.",
        "items": [
          [
            "Orientação",
            "+1d4 a teste de atributo; concentração."
          ],
          [
            "Bordão Místico",
            "Bastão usa CAR em ataque e dano; conta como mágico."
          ],
          [
            "Zombaria Viciosa",
            "SAB ou dano psíquico e desvantagem no próximo ataque."
          ],
          [
            "Chama Sagrada",
            "DES ou dano radiante; alvo não se beneficia de cobertura."
          ],
          [
            "Taumaturgia",
            "Efeitos dramáticos como voz forte e portas se abrindo."
          ],
          [
            "Consertar",
            "Repara pequenos objetos quebrados."
          ],
          [
            "Mensagem",
            "Sussurro distante com resposta breve."
          ]
        ]
      },
      {
        "kind": "spells",
        "title": "Escolha 1 magia de nível 1 ou nível 2",
        "intro": "Estas são as novas opções de nível 2; as de nível 1 do nível anterior continuam válidas. [Fiend] são opções adicionais, não automáticas.",
        "items": [
          [
            "Nuvem de Adagas",
            "área pequena causa 4d4 cortante a quem entra/começa turno; concentração"
          ],
          [
            "Coroa da Loucura",
            "humanoide pode atacar alvo escolhido; SAB anula; concentração"
          ],
          [
            "Escuridão",
            "área de trevas mágicas; concentração"
          ],
          [
            "Fascinar",
            "distrai alvos atentos a você"
          ],
          [
            "Imobilizar Pessoa",
            "paralisa humanoide; SAB anula; concentração"
          ],
          [
            "Invisibilidade",
            "alvo invisível até atacar/lançar magia; concentração"
          ],
          [
            "Imagem Espelhada",
            "duplicatas desviam ataques; sem concentração"
          ],
          [
            "Passo Nebuloso",
            "ação bônus; teleporte de 9 m"
          ],
          [
            "Raio do Enfraquecimento",
            "ataque reduz dano de arma baseado em FOR; concentração"
          ],
          [
            "Despedaçar",
            "esfera 3d8 trovejante; CON reduz"
          ],
          [
            "Patas de Aranha",
            "anda em paredes/teto; concentração"
          ],
          [
            "Sugestão",
            "ordem plausível; SAB anula; concentração"
          ],
          [
            "Cegueira/Surdez [Fiend]",
            "CON ou cego/surdo; sem concentração"
          ],
          [
            "Raio Ardente [Fiend]",
            "três raios de fogo, cada um 2d6 se acertar"
          ]
        ]
      }
    ]
  },
  {
    "name": "Calebi",
    "class": "Bruxo · Ínfero",
    "before": 3,
    "after": 4,
    "hp_before": 21,
    "hp_gain": 6,
    "hp_after": 27,
    "subtitle": "Uma melhoria de atributo, um truque e mais uma magia.",
    "hp_note": "29 PV antes de eventual aumento retroativo por CON.",
    "sections": [
      {
        "kind": "automatic",
        "title": "Ganhos automáticos",
        "intro": "",
        "items": [
          [
            "Truque",
            "Aprende mais um truque de bruxo. Os três truques extras do Tomo, se escolhido, são separados."
          ],
          [
            "Magia conhecida",
            "Passa de 4 para 5. Escolhe uma de nível 1 ou nível 2 das listas anteriores; pode trocar uma conhecida."
          ],
          [
            "Pacto Mágico",
            "Permanece com 2 espaços de magia de nível 2 por descanso curto/longo; ainda tem 2 invocações."
          ]
        ]
      },
      {
        "kind": "spells",
        "title": "Escolha 1 truque novo",
        "intro": "Já conhece Rajada Mística e Ilusão Menor.",
        "items": [
          [
            "Proteção contra Lâminas",
            "ação; resistência a dano de armas até o próximo turno"
          ],
          [
            "Toque Arrepiante",
            "ataque 36 m, 1d8 necrótico; alvo não cura até próximo turno"
          ],
          [
            "Amizade",
            "vantagem em teste de CAR contra uma criatura; depois ela percebe a magia"
          ],
          [
            "Mãos Mágicas",
            "mão remota manipula objeto leve"
          ],
          [
            "Borrifo Venenoso",
            "CON ou dano de veneno a curta distância"
          ],
          [
            "Prestidigitação",
            "pequenos efeitos sensoriais"
          ],
          [
            "Ataque Certeiro",
            "ação para vantagem no próximo ataque; concentração"
          ]
        ]
      },
      {
        "kind": "decision",
        "title": "Escolha de atributos",
        "intro": "Talentos são opcionais e não entram neste guia. Compare os números antes de decidir.",
        "items": [
          [
            "+2 em um atributo",
            "Aumente um atributo em 2; ele não pode ultrapassar 20."
          ],
          [
            "+1 em dois atributos",
            "Aumente dois atributos diferentes em 1; nenhum pode ultrapassar 20."
          ]
        ]
      },
      {
        "kind": "mechanical_note",
        "title": "Exemplos com os atributos atuais",
        "intro": "",
        "items": [
          [
            "Se escolher",
            "CAR 16 → 18 melhora CD 13 → 14 e ataque mágico +5 → +6; com Rajada Agonizante, seu bônus de dano passa de +3 para +4. DES 16 → 18 melhora CA/iniciativa; CON 13 → 15 daria 33 PV."
          ]
        ]
      }
    ]
  }
];
