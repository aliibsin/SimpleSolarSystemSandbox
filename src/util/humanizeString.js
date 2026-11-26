function humanize(str) {
  return str
      .replace(/^[\s_]+|[\s_]+$/g, '')
      .replace(/[_\s]+/g, ' ')
      .replace(/\b[a-z]/g, function(c) { return c.toUpperCase() })
}

export default humanize;
