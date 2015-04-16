# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0005_direccion_telefono'),
    ]

    operations = [
        migrations.AddField(
            model_name='comentario',
            name='recomendacion',
            field=models.CharField(blank=True, max_length=10, null=True, choices=[(b'si', b'si'), (b'no', b'no')]),
            preserve_default=True,
        ),
    ]
