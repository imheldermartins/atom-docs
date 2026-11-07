import { Marp } from '@marp-team/marp-core'
import { renderMermaidSVG } from 'beautiful-mermaid'

export default {
  html: true,
  engine: (options) => {
    const marp = new Marp(options)

    marp.use((md) => {
      const originalFence = md.renderer.rules.fence

      md.renderer.rules.fence = (...args) => {
        const [tokens, index] = args
        const token = tokens[index]

        if (token.info.trim() !== 'mermaid') {
          return originalFence(...args)
        }

        const renderedSvg = renderMermaidSVG(token.content, {
          transparent: true,
          padding: 12,
          nodeSpacing: 18,
          layerSpacing: 20,
          font: 'Arial',
          bg: '#eee8f5',
          fg: '#172238',
          line: '#596579',
          accent: '#596579',
        })

        // SVG marker IDs share the document scope across all slides.
        const prefix = `mermaid-${index}-`
        const svg = renderedSvg
          .replace(/(\s)id="([^"]+)"/g, (_, space, id) => `${space}id="${prefix}${id}"`)
          .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)

        return `<div class="diagram-projector">${svg}</div>`
      }
    })

    return marp
  },
}
