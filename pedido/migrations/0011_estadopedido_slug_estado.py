# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0010_metodopago'),
    ]

    operations = [
        migrations.AddField(
            model_name='estadopedido',
            name='slug_estado',
            field=models.CharField(max_length=120, null=True, blank=True),
            preserve_default=True,
        ),
    ]
