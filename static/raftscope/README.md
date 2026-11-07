# RaftScope para a apresentação ATOM

Simulador de Diego Ongaro / Stanford University, baseado na revisão
[`5b0c10a`](https://github.com/ongardie/raftscope/tree/5b0c10ab51f873721895e7470b49e04c94bf826f).
O arquivo `LICENSE` contém a licença do RaftScope.

A apresentação incorpora `index.html` em um iframe. `atom.css` e `atom.js`
adaptam a aparência e os controles. `script.js` usa a paleta do ATOM para
distinguir os termos. `slide.js` inicia a simulação quando o slide é ativado
e pausa ao sair. A velocidade inicial é aproximadamente 1/93×.
O primeiro líder eleito recebe um comando automático que fica registrado na
linha do tempo. O botão **Enviar comando** acrescenta comandos à demonstração.

As dependências locais seguem as versões do RaftScope original: Bootstrap
3.1.1, jQuery 2.0.3, Bootstrap Slider (`902e0bb`) e Bootstrap Context Menu
(`cd8dd35`). As licenças acompanham cada dependência.
