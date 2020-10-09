import { useEffect } from 'react'
const useExternalLink = (externalLink, scriptType) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = externalLink
    script.type = scriptType
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [externalLink, scriptType])
}
export default useExternalLink
