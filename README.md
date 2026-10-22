# Códice de Evolução — Ilha da Tempestade

Site estático para os jogadores conduzirem a evolução dos seis personagens, do nível 1 ao 4. O conteúdo de campanha vem do códice e das fichas oficiais fornecidas pelo mestre. Os ganhos por nível seguem as regras de D&D 5e de 2014, com as alterações de mesa descritas abaixo.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie **somente o conteúdo desta pasta** para a raiz: `index.html`, `app.js`, `data.js`, `creatures.js`, `spell-icons.js`, `style.css`, `cloud.js`, `cloud-config.js` e `assets/`.
2. Em **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**, selecione a branch principal e a pasta **/(root)**. Salve.
3. Aguarde o endereço aparecer na mesma página. Compartilhe esse endereço com os jogadores.

Guia oficial: [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

O site também pode ser aberto pelo `index.html`. Sem configurar a nuvem, funciona localmente, no aparelho em que foi aberto. Todos os retratos e os seis símbolos de classe enviados pelo mestre estão em `assets/`; os símbolos aparecem na seleção de personagem, na ficha e durante a evolução. O desenho da mochila está incluído nos arquivos do site.

## Sincronizar as fichas entre aparelhos

O GitHub Pages só hospeda os arquivos do site. Para a Amanda editar a ficha no celular e o mestre ver a mudança depois de atualizar a página, é preciso instalar a base compartilhada:

1. Crie um projeto em [Supabase](https://supabase.com/dashboard).
2. No **SQL Editor**, execute o arquivo **`INSTALAR_NUVEM_SUPABASE.sql`**, entregue ao lado desta pasta. Ele cria as seis fichas, grava os códigos com hash e define as permissões de leitura e gravação. **Não envie esse SQL ao GitHub:** ele contém os códigos antes de serem protegidos no banco.
3. Em **Settings → API Keys**, copie a **Project URL** e a **publishable key**. Preencha esses dois campos em `cloud-config.js`. A publishable key pode ficar no site público. **Nunca coloque uma secret key no site.**
4. Publique o conteúdo desta pasta no GitHub Pages. Guarde **`CODIGOS_PRIVADOS_NUVEM.txt`** fora do repositório e envie apenas o código correspondente a cada jogador.
5. Na primeira abertura online, uma ficha ainda vazia pode receber o progresso salvo **naquele mesmo endereço do site e navegador**. O progresso criado ao abrir um `index.html` local ou em outro endereço não migra sozinho: para levá-lo ao novo endereço, exporte o JSON no site antigo e importe-o no site publicado com o código do mestre. Se quiser começar a campanha limpa, não importe os testes.

Cada jogador abre o personagem com seu código. A ficha salva automaticamente no banco depois de cada alteração e mantém cópia local. O mestre abre o escudo com **0404**, informa o **código privado de mestre** e toca em **Atualizar todas as fichas** para consultar mudanças feitas em outros aparelhos. O botão **Atualizar ficha** faz o mesmo para o personagem aberto. Se duas pessoas editarem a mesma ficha ao mesmo tempo, o site avisa que há alterações pendentes e mantém a cópia local para exportação; ele não substitui silenciosamente a versão online.

Até o projeto Supabase ser criado e os dois valores de `cloud-config.js` serem preenchidos, a sincronização fica desativada. A instalação online ainda não pôde ser testada sem esse projeto.

## Como usar

O jogador escolhe o personagem, vê o nível atual em destaque e segura o botão redondo **SUBIR DE NÍVEL**. O botão fica dourado enquanto é pressionado. O site identifica o próximo nível pelo progresso salvo. A primeira tela mostra um D20 rolando e parando no novo nível; o jogador toca em **Continuar** para ver o aumento de PV máximos, com a contagem animada. Depois, cada ganho ou escolha aparece numa tela própria, com uma breve animação de entrada e instrução para atualizar a ficha. Cada opção indica se seu uso exige ação, ação bônus, reação, mais tempo ou nenhuma ação. A revisão final apresenta Vida, decisões e ganhos em blocos próprios e permite mudar escolhas. O jogador **segura o botão de confirmação** para concluir. Após confirmar, **O que dizer pro mestre** reúne as decisões e uma lista do que deve estar na ficha.

Ao abrir um personagem, a história aparece ao lado do retrato, com rolagem própria quando o texto não cabe. O resumo da ficha mostra os atributos atuais e dois botões lado a lado: **AÇÃO** e **AÇÃO BÔNUS**. Toque para abrir a lista correspondente. Habilidades da ficha têm destaque próprio; ações gerais ficam logo abaixo. Magias estão no **grimório roxo**, com ícone, resumo e tempo de uso. As Invocações Místicas escolhidas por Calebi aparecem em uma seção própria a partir do nível 2. O custo de recursos como Ação Ardilosa e Forma Selvagem muda conforme o nível e a escolha registrada. Atributos em rosa tiveram aumento em relação à ficha inicial. Cada ficha também tem anotações que podem ser criadas, editadas e excluídas, além de dicas para a mesa.

Cada personagem tem uma mochila com armas, roupas e outros pertences da ficha na mesma lista editável. Conjuntos de equipamento ocupam um espaço e mostram todas as peças ao abrir a descrição. João leva o violão e também mantém a gaita acrescentada nesta edição. Cada espaço aparece como um bloco arredondado, mesmo vazio; o + do próprio bloco adiciona um item. Toque no item para abrir sua descrição logo abaixo dele; se o texto for longo, role dentro da descrição. O lápis altera nome, quantidade e descrição, e o X retira o item. Itens de mesmo nome se empilham e ocupam um espaço só. As mochilas comuns têm 8 espaços, ou 14 quando os pertences iniciais passam de 8. A Mochila do Esquecimento de KIEDIS é ilimitada e mostra 30 espaços inicialmente. O ícone dourado ao lado de “Conteúdo da mochila” revela o item da campanha. A atualização agrupa conjuntos antigos quando suas peças ainda estão intactas e preserva itens que o jogador já tenha adicionado ou alterado.

O progresso também fica em `localStorage` **neste navegador e neste dispositivo**. Use a seta para baixo no topo para exportar um JSON e a seta para cima para importá-lo em outro navegador. Sem a nuvem, essa cópia local é a única. Com a nuvem configurada, ela serve como cópia de segurança e guarda alterações temporariamente quando a rede falha.

O escudo no canto superior direito abre a área de administração. Código visual: **0404**. Escolha o retrato de um personagem, veja seu nível salvo e toque no nível que deseja aplicar. Também é possível limpar apenas esse personagem ou resetar todos. Ao definir um nível manualmente, a ferramenta considera os níveis anteriores concluídos, mas não inventa escolhas não feitas. Ao reduzir o nível, as escolhas anteriores ficam guardadas para revisão. Em modo online, as alterações administrativas exigem também o código privado do mestre.

## Regras da mesa

- Você pode usar no máximo uma ação bônus por turno, quando uma habilidade, magia ou condição permitir.
- Tomar ou administrar uma poção de cura comum usa ação bônus. A poção restaura **2d4 + 2 PV**.
- Ajudar alguém caído para estabilizar usa ação bônus. Faça **SAB (Medicina) CD 10**. Estabilizar não recupera PV; a criatura permanece inconsciente a 0 PV até ser curada ou recuperar PV por outra regra.
- Os itens de campanha são mostrados com os efeitos descritos no códice. O mestre resolve casos fora dessas descrições.

Referências oficiais: [Classes](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/classes), [Combate](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/combat) e [Equipamento](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/equipment). Para detalhes completos de magias e criaturas, consulte o livro ou bestiário usado pela mesa.

## Arquivos e retratos

- `data.js`: conteúdo das 18 evoluções dos seis personagens para os níveis 2, 3 e 4.
- `creatures.js`: cartas de companheiras e formas de Lorelay, incluindo a quinta forma no nível 4.
- `spell-icons.js`: associação entre cada magia e um dos sprites fornecidos pelo mestre.
- `app.js`: regras de escolha, cálculo, navegação, resumo e armazenamento.
- `cloud.js`: leitura e gravação opcional da ficha compartilhada.
- `cloud-config.js`: URL e chave pública do projeto; inicialmente vazio.
- `style.css`: apresentação responsiva e animações.
- `assets/`: retratos, símbolos de classe, ícones SVG e sprites de magia fornecidos pelo mestre.

Os símbolos de escolhas vêm da coleção [Game Icons, de Lorc](https://game-icons.net), disponível no [repositório oficial](https://github.com/game-icons/icons). Os arquivos SVG foram ajustados apenas para remover o fundo escuro e harmonizar a cor. Os ícones de magia foram copiados da pasta de sprites enviada pelo mestre: 91 dos 113 foram pareados com o ícone nomeado correspondente na [galeria de bg3.wiki](https://bg3.wiki/wiki/Category:Spell_icons); as 22 magias sem correspondência nesse catálogo usam um símbolo escolhido pelo efeito. O [desenho da mochila, de Delapouite](https://game-icons.net/1x1/delapouite/backpack.html), está incluído localmente para funcionar sem conexão externa. Nenhuma imagem nova foi gerada nesta edição. A estrutura dos cartões de personagem foi adaptada da captura de tela enviada pelo mestre.

Veja [PONTOS_PARA_VALIDAR.md](PONTOS_PARA_VALIDAR.md) para as partes que exigem conferência na mesa.
