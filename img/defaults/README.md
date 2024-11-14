# Default Images

This folder is specifically for images in the theme that
are defaults when no other image is selected in the CRM.

For example, in a paragraph twig:

```
{% if paragraph.field_background_image is not empty %}
  style="background-image: url('{{ file_url(paragraph.field_background_image.entity.field_media_image.entity.fileuri) }}');"
{% else %}
  style="background-image: url($dir-img + '/defaults/background-default.jpg');"
{% endif %}
```
